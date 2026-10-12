export const qatarAttestationPage = {
  slug: 'qatar',
  title: 'Qatar Embassy Attestation Requirements',
  intro: 'For Qatar document attestation, documents must usually be prepared in line with the applicable embassy requirement, including attestation by the relevant Pakistani authority before submission.',
  sections: [
    {
      id: 'marriage-certificate',
      heading: 'Marriage Certificate / Nikah Nama',
      text: 'For marriage document attestation, the Marriage Registration Certificate issued by the relevant Union Council must be attested by MOFA Islamabad.',
      required: [
        'Union Council-issued Marriage Registration Certificate, attested by MOFA Islamabad.',
        'Copy of the Urdu Nikah Nama.',
        'CNIC copies of both husband and wife.',
        'Passport copies of both husband and wife.',
      ],
      note: 'The husband’s name must appear on the wife’s CNIC and passport, where required.'
    },
    {
      id: 'birth-certificate',
      heading: 'Birth Certificate',
      text: 'The birth certificate issued by the relevant Union Council must be attested by MOFA Islamabad before submission for embassy attestation.',
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
      text: 'Educational degrees and transcripts must be attested by the Higher Education Commission (HEC) and the Ministry of Foreign Affairs (MOFA), as applicable.',
      required: [
        'Original degree, attested by HEC and MOFA.',
        'Original transcripts, attested by HEC and MOFA.',
        'University-issued regular-status letter, attested by MOFA Islamabad, where required.',
        'CNIC copy.',
        'Passport copy.',
        'Matriculation certificate copy.',
        'Intermediate certificate copy.',
      ],
      note: 'A sample of the required university letter should be checked before submission to ensure that the document meets the relevant requirements.'
    }
  ]
};
