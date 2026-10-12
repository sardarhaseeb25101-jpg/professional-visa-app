export const uaeAttestationPage = {
  slug: 'uae',
  title: 'UAE Attestation Requirements',
  intro: 'We provide professional document attestation assistance for personal, educational, and official documents required for use in the United Arab Emirates. Requirements may vary depending on the document type, issuing authority, and the purpose for which the document is being submitted.',
  sections: [
    {
      id: 'mrc-frc',
      heading: 'Marriage Registration Certificate (MRC) / Family Registration Certificate (FRC)',
      text: 'The NADRA-issued Marriage Registration Certificate (MRC) or Family Registration Certificate (FRC) must be attested by the Ministry of Foreign Affairs (MOFA) before submission.',
      required: [
        'MOFA-attested NADRA Marriage Registration Certificate or Family Registration Certificate.',
        'Copies of the husband’s and wife’s CNICs.',
        'Copies of the husband’s and wife’s passports.',
        'Copy of the husband’s UAE visa.',
      ],
      note: 'The husband’s name must be mentioned on the wife’s CNIC and passport.'
    },
    {
      id: 'nadra-birth-certificate',
      heading: 'NADRA Birth Certificate',
      text: 'The NADRA-issued birth certificate must be attested by the Ministry of Foreign Affairs (MOFA).',
      required: [
        'MOFA-attested birth certificate.',
        'CNIC copies of both parents and the child, where applicable.',
        'Passport copies of the father, mother, and child.',
      ]
    },
    {
      id: 'death-certificate',
      heading: 'Death Certificate',
      text: 'The NADRA-issued death certificate must be attested by the Ministry of Foreign Affairs (MOFA).',
      required: [
        'Original death certificate, duly attested by MOFA.',
        'CNIC copy of the deceased, where applicable.',
        'Passport copy of the deceased, where available.',
      ]
    },
    {
      id: 'fingerprint-certificate',
      heading: 'Fingerprint Certificate',
      text: 'Fingerprint documents must be attested by the Ministry of Foreign Affairs (MOFA), where required.',
      required: [
        'Fingerprint certificate or record.',
        'CNIC copy.',
        'Passport copy.',
        'Supporting evidence explaining the purpose for which the fingerprint document is required.',
      ]
    },
    {
      id: 'divorce-certificate',
      heading: 'Divorce Certificate',
      text: 'A divorce certificate issued by NADRA must be attested by the Ministry of Foreign Affairs (MOFA). Alternatively, the relevant divorce documentation may be issued by the Chairman of the Arbitration Council or supported by a court judgment concerning the dissolution of marriage, subject to the applicable requirements.',
      required: [
        'Divorce certificate or other applicable divorce documentation.',
        'CNIC copy of the applicant.',
        'Passport copy of the applicant.',
        'Residence visa or work visa, where applicable.',
        'MOFA attestation, as required.',
      ]
    },
    {
      id: 'school-certificates',
      heading: 'Matriculation, Intermediate and Other School Certificates',
      text: 'Educational certificates at the primary, matriculation, and intermediate levels must be attested by the Inter Board Committee of Chairmen (IBCC), followed by the Ministry of Foreign Affairs (MOFA), in accordance with the applicable procedure.',
      required: [
        'Original certificate or marks sheet.',
        'IBCC attestation where applicable.',
        'MOFA attestation as required.',
        'CNIC and passport copies.',
      ],
      note: 'IBCC attestation is subject to the relevant board, regional office, and applicable requirements. Additional service charges may apply for Karachi-based assistance.'
    },
    {
      id: 'diploma-certificates',
      heading: 'Diploma Certificates',
      text: 'Diplomas and certificates issued by technical boards, vocational institutes, or other relevant institutions may require verification or attestation by the appropriate authority, including the National Vocational and Technical Training Commission (NAVTTC), depending on the qualification and issuing institution.',
      required: [
        'Original diploma or certificate.',
        'CNIC copy.',
        'Passport copy.',
        'Matriculation certificate attested by IBCC, where required.',
      ]
    },
    {
      id: 'degree-attestation',
      heading: 'Bachelor’s, Master’s and PhD Degrees',
      text: 'University degrees, including BA, BSc, MA, MSc, LLB, MBBS, MPhil, and PhD qualifications, must be attested by the Higher Education Commission (HEC), followed by MOFA attestation, as applicable.',
      required: [
        'Original degree.',
        'Original transcript or marksheets.',
        'CNIC copy.',
        'Passport copy.',
      ],
      note: 'Additional verification or supporting documents may be required depending on the qualification and institution.'
    }
  ]
};
