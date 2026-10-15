import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Inquiry from './models/Inquiry.js';
import Package from './models/Package.js';
import Hotel from './models/Hotel.js';
import attestation from './data/attestation.js';

const app = express();
app.use(cors());
app.use(express.json());

const fallbackPackages = [
  {
    _id: 'fallback-1',
    name: 'Economy',
    description: 'Balanced Umrah planning support for families and individuals looking for a practical, comfortable trip.',
    duration: 12,
    pricePerPerson: 185000,
    groupSize: '2-4 travelers',
    inclusions: ['Flights guidance', 'Hotel coordination', 'Visa assistance', 'Ground transfer support'],
    status: 'active',
  },
  {
    _id: 'fallback-2',
    name: 'Premium',
    description: 'A smoother, more comfortable Umrah journey with upgraded hotel access and guided planning support.',
    duration: 14,
    pricePerPerson: 245000,
    groupSize: '2-6 travelers',
    inclusions: ['Priority hotel guidance', 'Visa support', 'Local transfer planning', 'Travel consultation'],
    status: 'active',
  },
];

const fallbackHotels = [
  { _id: 'hotel-1', name: 'Makkah Residence', stars: 3, location: 'Makkah', pricePerNight: 22000, status: 'available' },
  { _id: 'hotel-2', name: 'Madinah Comfort', stars: 4, location: 'Madinah', pricePerNight: 29000, status: 'available' },
];

const mongoAvailable = () => Boolean(process.env.MONGO_URI);

const emailConfigured = () => Boolean(process.env.MAIL_HOST && process.env.MAIL_USER && process.env.MAIL_PASS && (process.env.MAIL_TO || process.env.MAIL_USER));

const getMailer = () => {
  if (!emailConfigured()) return null;

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: String(process.env.MAIL_SECURE || 'false').toLowerCase() === 'true' || Number(process.env.MAIL_PORT || 587) === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const sendInquiryEmail = async (payload) => {
  const transporter = getMailer();
  if (!transporter) return { sent: false, reason: 'MAIL_* settings are not configured.' };

  const mailTo = process.env.MAIL_TO || process.env.MAIL_USER;
  const subject = `New inquiry from ${payload.name} - ${payload.service || 'General enquiry'}`;
  const text = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Service: ${payload.service || 'Not specified'}`,
    `Country: ${payload.quote?.country || 'Not specified'}`,
    `Document: ${payload.quote?.document || 'Not specified'}`,
    '',
    payload.message || 'No message provided.',
  ].join('\n');

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: mailTo,
    subject,
    text,
  });

  return { sent: true, id: info.messageId };
};

const adminAuth = (req, res, next) => {
  const pwd = req.headers['x-admin-password'];
  if (!process.env.ADMIN_PASSWORD) return res.status(503).json({ error: 'Admin login is not configured on this server.' });
  if (pwd !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

app.get('/api/attestation', (_req, res) => res.json(attestation));

app.post('/api/inquiries', async (req, res) => {
  const { name, phone, email, service, message, quote } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required.' });

  const payload = { name, phone, email, service, message, quote };

  try {
    const emailResult = emailConfigured() ? await sendInquiryEmail(payload) : { sent: false, reason: 'MAIL_* settings are not configured.' };

    if (mongoAvailable()) {
      const doc = await Inquiry.create({ name, phone, email, service, message, quote });
      return res.status(201).json({
        id: doc._id,
        saved: true,
        email: emailResult.sent ? 'sent' : emailResult.reason,
      });
    }

    return res.status(201).json({
      id: 'offline-demo',
      saved: false,
      email: emailResult.sent ? 'sent' : emailResult.reason,
      message: emailResult.sent ? 'Request accepted and email sent.' : 'Request accepted in fallback mode. Configure MAIL_* in the server environment to enable live email delivery.',
    });
  } catch (e) {
    console.error('Could not process inquiry:', e.message);
    return res.status(500).json({ error: 'Could not save or deliver your request.' });
  }
});

app.get('/api/inquiries', adminAuth, async (_req, res) => {
  if (!mongoAvailable()) return res.json([]);
  try {
    const inquiries = await Inquiry.find().sort('-createdAt').limit(200);
    res.json(inquiries);
  } catch (e) {
    res.status(500).json({ error: 'Could not fetch inquiries.' });
  }
});

app.get('/api/packages', async (_req, res) => {
  if (!mongoAvailable()) return res.json(fallbackPackages);
  try {
    const packages = await Package.find({ status: 'active' }).sort('name');
    res.json(packages.length ? packages : fallbackPackages);
  } catch (e) {
    res.json(fallbackPackages);
  }
});

app.post('/api/packages', adminAuth, async (req, res) => {
  const { name, description, duration, pricePerPerson, groupSize, hotelId, inclusions } = req.body || {};
  if (!name || !duration || !pricePerPerson) return res.status(400).json({ error: 'Required fields missing.' });
  if (!mongoAvailable()) return res.status(201).json({ _id: 'fallback-package', name, description, duration, pricePerPerson, groupSize, hotelId, inclusions, status: 'active' });

  try {
    const pkg = await Package.create({ name, description, duration, pricePerPerson, groupSize, hotelId, inclusions, status: 'active' });
    res.status(201).json(pkg);
  } catch (e) { res.status(500).json({ error: 'Could not create package.' }); }
});

app.put('/api/packages/:id', adminAuth, async (req, res) => {
  if (!mongoAvailable()) return res.json({ _id: req.params.id, updated: true, ...req.body });
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) return res.status(404).json({ error: 'Package not found.' });
    res.json(pkg);
  } catch (e) { res.status(500).json({ error: 'Could not update package.' }); }
});

app.delete('/api/packages/:id', adminAuth, async (req, res) => {
  if (!mongoAvailable()) return res.json({ message: 'Package removed in fallback mode.' });
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
    if (!pkg) return res.status(404).json({ error: 'Package not found.' });
    res.json({ message: 'Package deleted.' });
  } catch (e) { res.status(500).json({ error: 'Could not delete package.' }); }
});

app.get('/api/hotels', async (_req, res) => {
  if (!mongoAvailable()) return res.json(fallbackHotels);
  try {
    const hotels = await Hotel.find({ status: 'available' });
    res.json(hotels.length ? hotels : fallbackHotels);
  } catch (e) {
    res.json(fallbackHotels);
  }
});

app.post('/api/hotels', adminAuth, async (req, res) => {
  const { name, stars, location, pricePerNight } = req.body || {};
  if (!name || !pricePerNight) return res.status(400).json({ error: 'Required fields missing.' });
  if (!mongoAvailable()) return res.status(201).json({ _id: 'fallback-hotel', name, stars, location, pricePerNight, status: 'available' });

  try {
    const hotel = await Hotel.create({ name, stars, location, pricePerNight, status: 'available' });
    res.status(201).json(hotel);
  } catch (e) { res.status(500).json({ error: 'Could not create hotel.' }); }
});

app.put('/api/hotels/:id', adminAuth, async (req, res) => {
  if (!mongoAvailable()) return res.json({ _id: req.params.id, updated: true, ...req.body });
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ error: 'Hotel not found.' });
    res.json(hotel);
  } catch (e) { res.status(500).json({ error: 'Could not update hotel.' }); }
});

app.delete('/api/hotels/:id', adminAuth, async (req, res) => {
  if (!mongoAvailable()) return res.json({ message: 'Hotel removed in fallback mode.' });
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, { status: 'unavailable' }, { new: true });
    if (!hotel) return res.status(404).json({ error: 'Hotel not found.' });
    res.json({ message: 'Hotel deleted.' });
  } catch (e) { res.status(500).json({ error: 'Could not delete hotel.' }); }
});

const startServer = (preferredPort = process.env.PORT || 5000) => {
  const port = preferredPort;
  const server = app.listen(port, () => console.log(`API running on port ${port}`));

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const fallbackPort = Number(port) + 1;
      console.warn(`Port ${port} is busy. Retrying on port ${fallbackPort}.`);
      startServer(fallbackPort);
      return;
    }

    console.error('Server startup error:', error.message);
  });
};

const connectMongo = async () => {
  if (!mongoAvailable()) {
    console.warn('MONGO_URI is not set. Server running in fallback mode without MongoDB.');
    startServer();
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    startServer();
  } catch (error) {
    console.warn('MongoDB connection failed; continuing in fallback mode.');
    console.warn(error.message);
    startServer();
  }
};

connectMongo();
