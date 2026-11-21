// Identity and contact. Only verified facts (docs/hechos.md in the profile workspace).
export const site = {
  name: 'Orlando Camacho',
  /** Full legal name: shown once, on the About page, to link certificates and documents to the brand. */
  fullName: 'Daniel Orlando Camacho Campos',
  url: 'https://orlandocamc.github.io',
  linkedin: 'https://www.linkedin.com/in/orlandocamacho',
  github: 'https://github.com/orlandocamc',
  university: {
    name: 'Universidad Iberoamericana Ciudad de México',
    short: 'IBERO',
    url: 'https://ibero.mx',
  },
  /**
   * Email: [to confirm]. Leave both parts empty until Orlando confirms the address.
   * When set, <Email /> renders it obfuscated (never as plain text in the HTML).
   */
  email: { user: '', domain: '' },
} as const;
