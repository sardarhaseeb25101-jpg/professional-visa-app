// EDIT THIS FILE to change calculator options, documents and timelines.
// "TBC" timelines are placeholders: replace with your real turnaround times.
export default {
  countries: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Europe / Other'],
  documents: ['Degree Certificate', 'Diploma', 'Transcript', 'Experience Certificate',
    'Marriage Certificate', 'Birth Certificate', 'Commercial Document'],
  services: {
    'Saudi Arabia': [
      { id: 'mofa', label: 'MOFA only', days: 'Usually 7-15 working days for a straightforward document route.', price: 'Approx. PKR 8,000-20,000 depending on the document and authority queue.' },
      { id: 'mofa-mosadaqa', label: 'MOFA + Mosadaqa', days: 'Typically 15-25 working days for degree-related cases, depending on university response time.', price: 'Approx. PKR 20,000-45,000 including document review and filing support.' },
      { id: 'full', label: 'MOFA + Mosadaqa + Embassy', days: 'Often 20-35 working days total, plus embassy processing time and document verification.', price: 'Approx. PKR 30,000-70,000 depending on document type and urgency.' },
      { id: 'embassy', label: 'Saudi Embassy / Consulate only', days: 'Usually 7-20 working days depending on office workload and document type.', price: 'Approx. PKR 10,000-30,000 depending on document category and authority route.' },
    ],
    default: [
      { id: 'mofa', label: 'MOFA attestation', days: 'Usually 7-15 working days depending on document and country rules.', price: 'Approx. PKR 8,000-20,000 for standard document handling.' },
      { id: 'embassy', label: 'MOFA + Embassy attestation', days: 'Usually 10-25 working days depending on the authority queue and document type.', price: 'Approx. PKR 15,000-35,000 for a complete authority route.' },
    ],
  },
  baseDocs: ['Original document', 'Clear passport copy (bio page)', 'CNIC copy'],
  extraDocs: {
    'Degree Certificate': ['Matching transcript', 'HEC attestation (before MOFA)'],
    Diploma: ['Matching transcript', 'HEC attestation (before MOFA)'],
    Transcript: ['Matching degree', 'HEC attestation (before MOFA)'],
    'Experience Certificate': ['Company letterhead, stamp and signature', 'Job title, From-To dates, HR contact details'],
    'Marriage Certificate': ['NADRA / Nikah Nama as applicable'],
    'Birth Certificate': ['NADRA birth certificate'],
    'Commercial Document': ['Chamber / company registration papers'],
  },
  mosadaqaDocs: ['Degree and transcript scans', 'HEC and MOFA stamp pictures', 'Name must match passport'],
};
