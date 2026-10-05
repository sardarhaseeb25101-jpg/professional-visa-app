// EDIT THIS FILE to change calculator options, documents and timelines.
// "TBC" timelines are placeholders: replace with your real turnaround times.
export default {
  countries: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Europe / Other'],
  documents: ['Degree Certificate', 'Diploma', 'Transcript', 'Experience Certificate',
    'Marriage Certificate', 'Birth Certificate', 'Commercial Document'],
  services: {
    'Saudi Arabia': [
      { id: 'mofa', label: 'MOFA only', days: 'TBC' },
      { id: 'mofa-mosadaqa', label: 'MOFA + Mosadaqa', days: '15-20 working days (Mosadaqa)' },
      { id: 'full', label: 'MOFA + Mosadaqa + Embassy', days: '15-20 working days + embassy time (TBC)' },
      { id: 'embassy', label: 'Saudi Embassy / Consulate only', days: 'TBC' },
    ],
    default: [
      { id: 'mofa', label: 'MOFA attestation', days: 'TBC' },
      { id: 'embassy', label: 'MOFA + Embassy attestation', days: 'TBC' },
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
