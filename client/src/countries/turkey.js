export const turkeyAttestationPage = {
  slug: 'turkey',
  title: 'Turkey Consulate Attestation Requirements',
  intro: 'We help prepare documents that may be required for consular processing in Turkey, including family and educational records.',
  sections: [
    {
      id: 'marriage-registration-certificate',
      heading: 'Marriage Registration Certificate',
      required: [
        'Marriage Registration Certificate attested by MOFA.',
        'CNIC copies of both husband and wife.',
        'Passport copies of both husband and wife.',
      ]
    },
    {
      id: 'birth-registration-certificate',
      heading: 'Birth Registration Certificate',
      required: [
        'Birth Registration Certificate attested by MOFA.',
        'Passport copy of the applicant.',
        'Passport copies of both parents.',
      ]
    },
    {
      id: 'degree-attestation',
      heading: 'Educational Degree Attestation',
      text: 'Educational degrees must be attested by the Higher Education Commission (HEC) and the Ministry of Foreign Affairs (MOFA), as applicable.',
      required: [
        'Original degree with the required HEC and MOFA attestations.',
        'Applicant’s CNIC copy.',
        'Applicant’s passport copy.',
      ],
      note: 'Estimated processing time: 6–7 working days.'
    }
  ]
};
