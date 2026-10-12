export const bahrainAttestationPage = {
  slug: 'bahrain',
  title: 'Bahrain Embassy Attestation Requirements',
  intro: 'We assist with attestation for Marriage Registration Certificates (MRCs), birth certificates, educational documents, and police certificates, subject to the applicable requirements.',
  sections: [
    {
      id: 'marriage-certificate',
      heading: 'Marriage Registration Certificate / Nikah Nama',
      text: 'The Marriage Registration Certificate issued by the relevant Union Council must be attested by MOFA Islamabad before embassy submission.',
      required: [
        'MOFA-attested Marriage Registration Certificate.',
        'Copy of the Urdu Nikah Nama.',
        'CNIC copies of both husband and wife.',
        'Passport copies of both husband and wife.',
      ],
      note: 'The husband’s name should appear on the wife’s CNIC and passport, where required.'
    },
    {
      id: 'birth-certificate',
      heading: 'Birth Certificate',
      text: 'The birth certificate issued by the relevant Union Council must be attested by MOFA Islamabad.',
      required: [
        'MOFA-attested birth certificate.',
        'CNIC copies of both parents.',
        'Passport copies of both parents.',
        'Passport copy of the child.',
      ]
    },
    {
      id: 'educational-degree',
      heading: 'Educational Degree Attestation',
      text: 'Educational degrees must be attested by HEC and MOFA, as applicable.',
      required: [
        'Original degree.',
        'Original transcripts or marksheets.',
        'Required HEC and MOFA attestations.',
        'CNIC copy.',
        'Matriculation certificate copy.',
        'Intermediate certificate copy.',
      ]
    },
    {
      id: 'police-certificate',
      heading: 'Police Certificate Attestation',
      text: 'Police certificates may require verification and attestation by the relevant issuing authorities before embassy submission.',
      required: [
        'Police certificate issued by the relevant authority.',
        'CNIC and passport copies as requested by the issuing authorities.',
        'Any required verification or supporting evidence for embassy processing.',
      ],
      note: 'Please contact us to confirm the specific documents and procedure applicable to your certificate.'
    }
  ]
};
