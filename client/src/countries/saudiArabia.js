export const countryMenu = [
  { country: 'Saudi Arabia', path: '/saudi-arabia-attestation', flag: '🇸🇦' },
  { country: 'UAE', path: '/country/uae', flag: '🇦🇪' },
  { country: 'Qatar', path: '/country/qatar', flag: '🇶🇦' },
  { country: 'Turkey', path: '/country/turkey', flag: '🇹🇷' },
  { country: 'Vietnam', path: '/country/vietnam', flag: '🇻🇳' },
  { country: 'Bahrain', path: '/country/bahrain', flag: '🇧🇭' },
];

export const saudiAttestationServices = [
  { slug: 'degree-attestation', title: 'Degree Attestation', summary: 'University degree and transcript verification for employment and visa use in Saudi Arabia.' },
  { slug: 'diploma-attestation', title: 'Diploma Attestation', summary: 'Technical diploma attestation through the relevant education board, MOFA, and Saudi authorities.' },
  { slug: 'marriage-certificate-attestation', title: 'Marriage Certificate Attestation', summary: 'Family documentation attestation for spouse visa, family visa and residency-related requirements.' },
  { slug: 'birth-certificate-b-form-attestation', title: 'Birth Certificate / B-Form Attestation', summary: 'Child identity and family record attestation for dependent visa and residency applications.' },
  { slug: 'school-leaving-certificate-attestation', title: 'School Leaving Certificate Attestation', summary: 'Educational documents attestation for school records, family documentation and student processing.' },
  { slug: 'bona-fide-student-certificate-attestation', title: 'Bona Fide Student Certificate Attestation', summary: 'Student status and school verification for student-related Saudi processes and visa matters.' },
  { slug: 'chartered-accountancy-certificate-attestation', title: 'Chartered Accountancy Certificate Attestation', summary: 'ICAP qualification attestation for Saudi-based professional and job-related documentation.' },
  { slug: 'hec-degree-attestation', title: 'HEC Degree Attestation', summary: 'HEC verification for graduates who require qualification attestation before Saudi processing.' },
  { slug: 'police-character-certificate-attestation', title: 'Police Character Certificate Attestation', summary: 'Character certificate attestation for Saudi employment, residency and legal processing.' },
  { slug: 'pmdc-certificate-attestation', title: 'PMDC Certificate Attestation', summary: 'Medical credential attestation for doctors and healthcare professionals.' },
  { slug: 'death-certificate-attestation', title: 'Death / Succession / Power of Attorney Attestation', summary: 'Legal family and inheritance documentation attestation for cases involving a deceased person.' },
  { slug: 'commercial-document-attestation', title: 'Commercial Document Attestation', summary: 'Company papers, invoices, packing lists, certificates of origin, and corporate legal documents.' },
];

export const saudiAttestationPages = {
  'degree-attestation': {
    title: 'Degree Attestation for Saudi Arabia',
    intro: 'University degree attestation is an important part of preparing eligible academic qualifications for use in Saudi Arabia. Applicants may need verification and attestation from HEC Pakistan, the Ministry of Foreign Affairs of Pakistan, and the relevant Saudi authorities.',
    process: '15-20 working days',
    checklist: [
      'Employment contract or job offer attested by the Saudi Chamber of Commerce and Saudi MOFA.',
      'Original degree attested by HEC and MOFA Pakistan.',
      'Original marks sheet or consolidated academic transcript.',
      'Screenshot from the HEC system showing the applicant\'s name, degree title, and document type.',
      'Original passport, or a clear colour scan for applicants residing overseas.',
      'Original CNIC Smart Card, including both sides.',
      'University verification letter confirming that the applicant completed the programme as a regular student.',
      'Original paid fee receipt for university email-based degree verification with the Saudi Cultural Mission.',
      'Copy of E-Wakala or Iqama, where applicable.',
      'Absher printout showing Iqama details.',
      'Two complete sets of photocopies of all documents.'
    ],
    important: [
      'The employment contract or job offer must have been issued less than one year before submission.',
      'The current passport number and Iqama number must appear on the contract.',
      'The applicant\'s name and father\'s name must match across the degree, passport, CNIC, employment contract, and request letters.',
      'Degrees obtained through online, distance, private, external, or overseas study modes are not accepted by the Saudi Cultural Attaché.',
      'Married female applicants may need to provide the original Marriage Registration Certificate or Nikah Nama and an affidavit relating to a name change after marriage.'
    ],
    note: 'Delays or objections may arise from the Saudi Cultural Mission. University communications with the mission are confidential, so the agency cannot follow up directly on those communications.'
  },
  'diploma-attestation': {
    title: 'Diploma Attestation',
    intro: 'Professional Travel & Visa Services assists applicants in preparing technical diploma documents for attestation by the Saudi Embassy.',
    process: '15-20 working days',
    checklist: [
      'Copy of the employment contract or job offer from the Saudi company, attested by the Saudi Chamber of Commerce and Saudi MOFA.',
      'Original request letter addressed to the Saudi Embassy and attested by the Saudi Chamber of Commerce.',
      'Original diploma attested by the relevant Board of Technical Education and IBCC.',
      'Original diploma attested by MOFA Pakistan.',
      'Original diploma marks sheet or consolidated transcript.',
      'Copies of Matriculation and Intermediate certificates.',
      'Copy of CNIC or NICOP.',
      'Copy of Iqama for existing residents of Saudi Arabia.',
      'Copy of the passport\'s main information page.',
      'Copy of the visa for Iqama holders or visa approval for new applicants.',
      'Two complete sets of photocopies.'
    ],
    important: [
      'The applicant\'s passport number must be included in both the employment document and the request letter.'
    ],
    note: 'Estimated processing time: 15-20 working days.'
  },
  'marriage-certificate-attestation': {
    title: 'Marriage Certificate Attestation',
    intro: 'Marriage Registration Certificate attestation may be required for official family-related procedures in Saudi Arabia. The document checklist varies depending on whether the application is submitted through the Saudi Embassy in Islamabad or the Royal Saudi Consulate in Karachi.',
    process: '10-12 working days',
    checklist: [
      'Copy of the husband\'s valid Iqama.',
      'Copy of the husband\'s employment visa endorsed in his passport.',
      'Copy of the husband\'s valid CNIC.',
      'Copy of the wife\'s valid CNIC showing her husband\'s name.',
      'Passport copies of both spouses.',
      'Original Marriage Registration Certificate attested by MOFA Pakistan.',
      'Optional one-page Arabic-English translation prepared by an authorized translation centre and attested by MOFA.',
      'One complete photocopy set of all documents.'
    ],
    important: [
      'Saudi Embassy, Islamabad: estimated processing time 10-12 working days.',
      'Royal Saudi Consulate, Karachi: estimated processing time 5-7 working days.'
    ],
    note: 'The exact checklist may vary by office and case type, so confirm the relevant authority before submission.'
  },
  'birth-certificate-b-form-attestation': {
    title: 'Birth Certificate and B-Form Attestation',
    intro: 'Birth certificate and B-Form attestation requires the child\'s identification documents, parents\' identification documents, and supporting family records.',
    process: '4-6 working days',
    checklist: [
      'Copy of the valid Iqama of the father or mother employed in Saudi Arabia.',
      'CNIC copies of both parents.',
      'Passport copies of the father, mother, and child.',
      'Original parents\' Marriage Registration Certificate attested by the Saudi Embassy.',
      'Personal-details printout from Absher or Muqeem.',
      'Original B-Form or Birth Certificate attested by MOFA Pakistan.',
      'Copy of the complete page showing the child\'s first-entry visa to Saudi Arabia.',
      'One complete photocopy set of all documents.'
    ],
    important: [
      'The parents\' Marriage Registration Certificate must be attested before the child\'s B-Form or Birth Certificate can be processed.',
      'Confirm the applicable checklist with the relevant authority before submission.'
    ],
    note: 'Saudi Consulate requirements are similar but can require the marriage certificate to be attested by the consulate as well.'
  },
  'school-leaving-certificate-attestation': {
    title: 'School Leaving Certificate and Report Card Attestation',
    intro: 'School Leaving Certificates and academic report cards may require attestation from the concerned provincial Education Department, followed by attestation from MOFA Pakistan.',
    process: '3-7 working days',
    checklist: [
      'Copy of the student\'s Iqama.',
      'Copy of the student\'s passport.',
      'Copy of the student\'s CNIC, where applicable.',
      'Copy of the student\'s visa.',
      'Copy of the parent\'s Iqama.',
      'Copy of the parent\'s passport.',
      'Copy of the parent\'s CNIC.',
      'Copy of the parent\'s visa.',
      'One complete photocopy set of all documents.'
    ],
    important: [
      'If the family has not yet received an Iqama, a copy of the family visa is required.',
      'The exact provincial Education Department requirement may differ by region.'
    ],
    note: 'Estimated processing time: 3-7 working days.'
  },
  'bona-fide-student-certificate-attestation': {
    title: 'Bona Fide Student Certificate Attestation',
    intro: 'A Bona Fide Student Certificate confirms a student\'s enrolment or status at an educational institution. The applicable attestation process may involve the relevant provincial Education Department and MOFA Pakistan.',
    process: '3-7 working days',
    checklist: [
      'Copy of the student\'s Iqama.',
      'Copy of the parent\'s Iqama.',
      'Copy of the student\'s passport.',
      'Copy of the parent\'s passport.',
      'Original student ID card.',
      'Exit/re-entry permit.',
      'One complete photocopy set of all documents.'
    ],
    important: [
      'The supplied requirements also specify attestation by the relevant provincial Education Department and MOFA Pakistan.'
    ],
    note: 'Saudi Consulate, Karachi may require a shorter checklist and can differ by office requirements.'
  },
  'chartered-accountancy-certificate-attestation': {
    title: 'Chartered Accountancy Certificate Attestation',
    intro: 'Applicants requiring attestation of their Chartered Accountancy qualifications for Saudi Arabia should prepare the documents issued by the Institute of Chartered Accountants of Pakistan (ICAP), along with their employment and identification records.',
    process: '10-15 working days',
    checklist: [
      'Original CA Intermediate Certificate verified by ICAP.',
      'Regular-status letter issued by ICAP.',
      'Module marks sheet issued by ICAP.',
      'Sealed envelope issued by ICAP.',
      'Copy of the job offer letter attested by the Saudi Chamber of Commerce and Saudi MOFA.',
      'E-Wakala.',
      'Copies of the passport and CNIC.',
      'Two complete sets of photocopies.'
    ],
    important: [
      'ICAP-issued documents must be complete and issued by the correct regulatory authority.'
    ],
    note: 'Estimated processing time: 10-15 working days.'
  },
  'hec-degree-attestation': {
    title: 'HEC Degree Attestation',
    intro: 'The Higher Education Commission (HEC) attests eligible academic qualifications according to its applicable procedures. Applicants should prepare the following documents before applying.',
    process: 'Varies by case',
    checklist: [
      'Original university degree.',
      'Original transcript.',
      'Original HSC/Intermediate certificate and marks sheet.',
      'Original SSC/Matriculation certificate and marks sheet.',
      'Original PEC certificate for engineers.',
      'Original PMDC certificate for doctors, as specified in the supplied requirements.',
      'Copies of the front and back of the CNIC.',
      'One recent passport-size photograph.',
      'Completed HEC data questionnaire.',
      'Two complete sets of photocopies.'
    ],
    important: [
      'Registration with PEC is mandatory for engineering graduates.',
      'Registration with the relevant medical council is required for medical graduates.',
      'If the degree holder cannot attend in person, an authorization letter is required.',
      'The applicant\'s name and father\'s name must match across all documents.',
      'Documents covered with hard lamination are not accepted.'
    ],
    note: 'Applicants should confirm current requirements directly with HEC before submitting their documents.'
  },
  'police-character-certificate-attestation': {
    title: 'Police Character Certificate Attestation',
    intro: 'Police Character Certificate attestation may be required for employment or other official purposes in Saudi Arabia.',
    process: '3-7 working days',
    checklist: [
      'Original Police Character Certificate attested by MOFA Pakistan.',
      'Copy of the Iqama.',
      'Copy of the passport.',
      'Copy of the CNIC.',
      'Saudi police report referred to in the supplied requirements as Taqreer Tahqeeq Shakhsi (two pages).',
      'One complete photocopy set of all documents.'
    ],
    important: [
      'The police report and identity documents must be complete and readable.'
    ],
    note: 'Estimated processing time: 3-7 working days.'
  },
  'pmdc-certificate-attestation': {
    title: 'PMDC Certificate Attestation',
    intro: 'Medical professionals preparing documentation for Saudi Arabia may require attestation of their Pakistan Medical and Dental Council (PMDC) certificate and supporting qualifications.',
    process: '12-15 working days',
    checklist: [
      'Original PMDC certificate.',
      'Original MBBS degree attested by the Saudi Cultural Mission and Saudi Embassy.',
      'Copy of CNIC or NICOP.',
      'Copy of passport.',
      'Copy of Iqama.',
      'Copy of the complete visa page.',
      'Employment contract.'
    ],
    important: [
      'The document specifies attestation through the Ministry of Health (MOH), Ministry of Foreign Affairs (MOFA), PMDC Islamabad, and NHRA Islamabad.'
    ],
    note: 'Professional Travel & Visa Services also offers assistance with the attestation stages listed for MOH, PMDC Islamabad, and NHRA Islamabad.'
  },
  'death-certificate-attestation': {
    title: 'Death Certificate / Succession Certificate / Power of Attorney Attestation',
    intro: 'When a person passes away, the family may need to arrange attestation of legal documents to establish the death, identify the lawful heirs, and authorize a representative to receive outstanding employment benefits from a Saudi company.',
    process: '3-7 working days',
    checklist: [
      'Death Certificate issued by NADRA and attested by MOFA Pakistan.',
      'Succession Certificate issued by the relevant Family Court or Civil Judge and attested by MOFA.',
      'Power of Attorney in favour of the person authorized to collect the deceased\'s outstanding dues from the Saudi employer, attested by MOFA.',
      'Copy of the deceased person\'s Iqama.',
      'Copy of the Iqama of the person receiving the dues.',
      'Copy of the deceased person\'s exit/entry record, where applicable.',
      'CNIC copies of all legal heirs.',
      'One complete photocopy set of all documents.'
    ],
    important: [
      'The Death Certificate establishes the death, the Succession Certificate identifies the legal heirs, and the Power of Attorney authorizes a designated representative to collect any outstanding dues held by the employer in Saudi Arabia.'
    ],
    note: 'If the death occurred in Saudi Arabia, the checklist changes and the relevant Saudi-issued death certificate should be submitted first.'
  },
  'commercial-document-attestation': {
    title: 'Commercial Document Attestation',
    intro: 'Professional Travel & Visa Services also provides guidance for businesses preparing commercial documents for attestation or legalization. Depending on the document and its intended use, the relevant paperwork may include invoices, packing lists, certificates of origin, and corporate records.',
    process: 'Varies by document type',
    checklist: [
      'Export invoices.',
      'Packing lists.',
      'Certificates of Origin.',
      'Certificates of Incorporation.',
      'Commercial Powers of Attorney.',
      'Chemical analysis reports.',
      'Physical analysis reports.',
      'Memorandums and corporate documents.',
      'Food product testing reports.'
    ],
    important: [
      'The applicable procedure and supporting documents should be confirmed according to the document type and the receiving authority\'s requirements.'
    ],
    note: 'This is a document-by-document process and should be reviewed before submission.'
  }
};
