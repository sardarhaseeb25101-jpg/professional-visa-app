import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Inquiry from './models/Inquiry.js';
import Package from './models/Package.js';
import Hotel from './models/Hotel.js';
import attestation from './data/attestation.js';

const app = express();
app.use(cors());
app.use(express.json());

// Admin auth middleware
const adminAuth = (req, res, next) => {
  const pwd = req.headers['x-admin-password'];
  if (pwd !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

// Attestation
app.get('/api/attestation', (_req, res) => res.json(attestation));

// Inquiries
app.post('/api/inquiries', async (req, res) => {
  const { name, phone, email, service, message, quote } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required.' });
  try {
    const doc = await Inquiry.create({ name, phone, email, service, message, quote });
    res.status(201).json({ id: doc._id });
  } catch (e) { res.status(500).json({ error: 'Could not save your request.' }); }
});

app.get('/api/inquiries', adminAuth, async (_req, res) => res.json(await Inquiry.find().sort('-createdAt').limit(200)));

// Packages - Public
app.get('/api/packages', async (_req, res) => {
  try {
    const packages = await Package.find({ status: 'active' }).sort('name');
    res.json(packages);
  } catch (e) {
    res.status(500).json({ error: 'Could not fetch packages.' });
  }
});

// Packages - Admin
app.post('/api/packages', adminAuth, async (req, res) => {
  const { name, description, duration, pricePerPerson, groupSize, hotelId, inclusions } = req.body || {};
  if (!name || !duration || !pricePerPerson) return res.status(400).json({ error: 'Required fields missing.' });
  try {
    const pkg = await Package.create({ name, description, duration, pricePerPerson, groupSize, hotelId, inclusions, status: 'active' });
    res.status(201).json(pkg);
  } catch (e) { res.status(500).json({ error: 'Could not create package.' }); }
});

app.put('/api/packages/:id', adminAuth, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) return res.status(404).json({ error: 'Package not found.' });
    res.json(pkg);
  } catch (e) { res.status(500).json({ error: 'Could not update package.' }); }
});

app.delete('/api/packages/:id', adminAuth, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
    if (!pkg) return res.status(404).json({ error: 'Package not found.' });
    res.json({ message: 'Package deleted.' });
  } catch (e) { res.status(500).json({ error: 'Could not delete package.' }); }
});

// Hotels - Public
app.get('/api/hotels', async (_req, res) => {
  try {
    const hotels = await Hotel.find({ status: 'available' });
    res.json(hotels);
  } catch (e) {
    res.status(500).json({ error: 'Could not fetch hotels.' });
  }
});

// Hotels - Admin
app.post('/api/hotels', adminAuth, async (req, res) => {
  const { name, stars, location, pricePerNight } = req.body || {};
  if (!name || !pricePerNight) return res.status(400).json({ error: 'Required fields missing.' });
  try {
    const hotel = await Hotel.create({ name, stars, location, pricePerNight, status: 'available' });
    res.status(201).json(hotel);
  } catch (e) { res.status(500).json({ error: 'Could not create hotel.' }); }
});

app.put('/api/hotels/:id', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ error: 'Hotel not found.' });
    res.json(hotel);
  } catch (e) { res.status(500).json({ error: 'Could not update hotel.' }); }
});

app.delete('/api/hotels/:id', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, { status: 'unavailable' }, { new: true });
    if (!hotel) return res.status(404).json({ error: 'Hotel not found.' });
    res.json({ message: 'Hotel deleted.' });
  } catch (e) { res.status(500).json({ error: 'Could not delete hotel.' }); }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('API running')))
  .catch((e) => { console.error(e.message); process.exit(1); });
