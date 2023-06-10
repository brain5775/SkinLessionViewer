export const data = {
  resourceType: "Bundle",
  id: "1737",
  meta: {
    versionId: "1",
    lastUpdated: "2023-05-26T21:21:48.575+08:00",
    source: "#9l6WmIRZC9TViCgN",
  },
  type: "document",
  entry: [
    {
      fullUrl: "http://203.64.84.32:9876/fhir/Composition/1736",
      resource: {
        resourceType: "Composition",
        id: "1736",
        meta: {
          versionId: "1",
          lastUpdated: "2023-05-26T21:21:39.326+08:00",
        },
        status: "final",
        type: {
          coding: [
            {
              system:
                "https://203.64.84.150:58443/r5/fhir/CodeSystem/8f414151-bf5f-46ce-94fe-f96d9e867d29",
              code: "skinlesion.image.document",
              display: "Skin lesion image document",
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "LP173421-1",
                display: "Report",
              },
            ],
          },
        ],
        subject: {
          reference: "Patient/88df8172-9f58-4a0f-bcca-bcdcd5ea6485",
          display: "Will Smith",
        },
        date: "2023-05-26T21:19:13.13+08:00",
        author: [
          {
            reference: "PractitionerRole/af055cb6-bd06-4ce4-9967-90d4e9f25044",
            display: "Dr. Carolina SpKK",
          },
        ],
        title: "Skin lesion report",
        custodian: {
          reference: "Organization/4af8db0c-50d1-406e-a134-d2972c79f194",
          display: "Yuli Hospital",
        },
        section: [
          {
            entry: [
              {
                reference: "Patient/88df8172-9f58-4a0f-bcca-bcdcd5ea6485",
              },
              {
                reference: "Organization/4af8db0c-50d1-406e-a134-d2972c79f194",
              },
              {
                reference:
                  "PractitionerRole/af055cb6-bd06-4ce4-9967-90d4e9f25044",
              },
              {
                reference: "DocumentReference/1735",
              },
            ],
          },
        ],
      },
    },
    {
      fullUrl:
        "https://203.64.84.150:58443/r5/fhir/Patient/88df8172-9f58-4a0f-bcca-bcdcd5ea6485",
      resource: {
        resourceType: "Patient",
        id: "88df8172-9f58-4a0f-bcca-bcdcd5ea6485",
        meta: {
          versionId: "4",
          lastUpdated: "2023-05-10T14:42:44.765+08:00",
          source: "#C07D8zC9R1A2HGjq",
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table class="hapiPropertyTable"><tbody/></table></div>',
        },
        identifier: [
          {
            system:
              "https://docs.google.com/spreadsheets/d/1BBBZZbEO82wkvLbHtbpa4ihdFTMoIG0KQGH5bgUoo70/edit#gid=629648762",
            value: "YuliHospital_Patient01",
          },
        ],
        name: [
          {
            text: "Will Smith",
            family: "Smith",
            given: ["Will"],
          },
        ],
        managingOrganization: {
          reference: "Organization/4af8db0c-50d1-406e-a134-d2972c79f194",
          display: "Yuli Hospital",
        },
      },
    },
    {
      fullUrl:
        "https://203.64.84.150:58443/r5/fhir/Organization/4af8db0c-50d1-406e-a134-d2972c79f194",
      resource: {
        resourceType: "Organization",
        id: "4af8db0c-50d1-406e-a134-d2972c79f194",
        meta: {
          versionId: "1",
          lastUpdated: "2023-04-25T13:11:53.429+08:00",
          source: "#4yZLXA2ZUFza5VBj",
        },
        identifier: [
          {
            use: "official",
            system: "HOSP_RowId",
            value: "2",
          },
          {
            use: "usual",
            system: "HOSP_Code",
            value: "8889",
          },
        ],
        active: true,
        type: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/organization-type",
                code: "prov",
                display: "Healthcare Provider",
              },
            ],
          },
        ],
        name: "Yuli Hospital",
        contact: [
          {
            purpose: {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/contactentity-type",
                  code: "ADMIN",
                  display: "Administrative",
                },
              ],
            },
            name: {
              text: "Emergency",
            },
            telecom: [
              {
                system: "phone",
                value: "(021)50950800",
                use: "work",
              },
            ],
          },
          {
            purpose: {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/contactentity-type",
                  code: "ADMIN",
                  display: "Administrative",
                },
              ],
            },
            name: {
              text: "Call Center Telephone",
            },
            telecom: [
              {
                system: "phone",
                value: "(03)50950888",
                use: "work",
              },
            ],
          },
          {
            purpose: {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/contactentity-type",
                  code: "ADMIN",
                  display: "Administrative",
                },
              ],
            },
            name: {
              text: "Call Center WA",
            },
            telecom: [
              {
                system: "other",
                value: "(+886)909678987",
                use: "work",
              },
            ],
          },
        ],
      },
    },
    {
      fullUrl:
        "https://203.64.84.150:58443/r5/fhir/PractitionerRole/af055cb6-bd06-4ce4-9967-90d4e9f25044",
      resource: {
        resourceType: "PractitionerRole",
        id: "af055cb6-bd06-4ce4-9967-90d4e9f25044",
        meta: {
          versionId: "6",
          lastUpdated: "2023-05-10T14:37:41.907+08:00",
          source: "#HZQ91V1UZ8FNFHpa",
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml">\n\t\t\t<p>\n\t\t\t\tDr Carolina SpKK is a Referring Practitioner for Tzu Chi Hospital from 1-Jan 2012 to 31-Mar\n\t\t\t\t2023\n\t\t\t</p>\n\t\t</div>',
        },
        identifier: [
          {
            system:
              "https://docs.google.com/spreadsheets/d/1BBBZZbEO82wkvLbHtbpa4ihdFTMoIG0KQGH5bgUoo70/edit#gid=1612656841",
            value: "YuliHospital_Practitioner01",
          },
        ],
        active: true,
        period: {
          start: "2012-01-01",
          end: "2023-03-31",
        },
        practitioner: {
          reference: "Practitioner/2a057b21-8a41-4372-a8af-9d183032f4ef",
          display: "Dr. Carolina SpKK",
        },
        organization: {
          reference: "Organization/4af8db0c-50d1-406e-a134-d2972c79f194",
          display: "Yuli Hospital",
        },
        code: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0286",
                code: "RP",
              },
            ],
          },
        ],
        specialty: [
          {
            coding: [
              {
                system:
                  "https://203.64.84.150:58443/r5/fhir/CodeSystem/8f414151-bf5f-46ce-94fe-f96d9e867d29",
                code: "Dermatologist",
                display: "Dermatologist",
              },
            ],
          },
        ],
      },
    },
    {
      fullUrl: "https://203.64.84.150:58443/r5/fhir/DocumentReference/1735",
      resource: {
        resourceType: "DocumentReference",
        id: "1735",
        meta: {
          versionId: "1",
          lastUpdated: "2023-05-26T21:21:04.501+08:00",
          source: "#CraVkVIqblYopLHZ",
        },
        identifier: [
          {
            system: "guid",
            value: "48df8bd5-d9a0-47e8-afd9-c2d71ab5d031",
          },
        ],
        status: "current",
        docStatus: "final",
        type: {
          coding: [
            {
              system: "http://MISAC.org/codeSystem/doc-typecodes",
              code: "skinlesion.image",
              display: "Skin lesion image",
            },
          ],
          text: "Skin lesion examination attachment",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/media-category",
                code: "image",
                display: "Image",
              },
              {
                system:
                  "https://203.64.84.150:58443/r5/fhir/CodeSystem/8f414151-bf5f-46ce-94fe-f96d9e867d29",
                code: "skinlesion.imagestudy",
                display: "Skin lesion image study",
              },
            ],
          },
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/media-category",
                code: "image",
                display: "Image",
              },
              {
                system:
                  "https://203.64.84.150:58443/r5/fhir/CodeSystem/8f414151-bf5f-46ce-94fe-f96d9e867d29",
                code: "skinlesion.imagestudy",
                display: "Skin lesion image study",
              },
            ],
          },
        ],
        subject: {
          reference: "Patient/88df8172-9f58-4a0f-bcca-bcdcd5ea6485",
          display: "Will Smith",
        },
        date: "2023-05-26T21:18:37.37+08:00",
        author: [
          {
            reference: "PractitionerRole/af055cb6-bd06-4ce4-9967-90d4e9f25044",
            display: "Dr. Carolina SpKK",
          },
        ],
        description:
          "This is document reference for recording skin lesion examination attached images",
        securityLabel: [
          {
            coding: [
              {
                system: "http://hl7.org/fhir/ValueSet/security-label-examples",
                code: "R",
                display: "restricted",
              },
            ],
            text: "restricted",
          },
        ],
        content: [
          {
            attachment: {
              contentType: "image/jpeg",
              url: "https://59.126.145.136:53443/SkinlesionManagement/Image/1734/f247f3d6-75a8-4dab-87b8-ea5cb6ee34d4.JPG",
              title: "f247f3d6-75a8-4dab-87b8-ea5cb6ee34d4.JPG",
            },
          },
        ],
      },
    },
  ],
};

export const prov = {
  resourceType: "CodeSystem",
  id: "v2-0286",
  text: {
    status: "generated",
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Properties</b></p><p><b>This code system  defines the following properties for its concepts</b></p><table class="grid"><tr><td><b>Code</b></td><td><b>URI</b></td><td><b>Type</b></td><td><b>Description</b></td></tr><tr><td>status</td><td>http://terminology.hl7.org/CodeSystem/utg-concept-properties#status</td><td>code</td><td>Status of the concept</td></tr><tr><td>deprecated</td><td>http://terminology.hl7.org/CodeSystem/utg-concept-properties#v2-table-deprecated</td><td>code</td><td>Version of HL7 in which the code was deprecated</td></tr></table><p><b>Concepts</b></p><p>This code system <code>http://terminology.hl7.org/CodeSystem/v2-0286</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td style="white-space:nowrap">RP<a name="v2-0286-RP"> </a></td><td>Referring Provider</td><td>Referring Provider</td></tr><tr><td style="white-space:nowrap">PP<a name="v2-0286-PP"> </a></td><td>Primary Care Provider</td><td>Primary Care Provider</td></tr><tr><td style="white-space:nowrap">CP<a name="v2-0286-CP"> </a></td><td>Consulting Provider</td><td>Consulting Provider</td></tr><tr><td style="white-space:nowrap">RT<a name="v2-0286-RT"> </a></td><td>Referred to Provider</td><td>Referred to Provider</td></tr></table></div>',
  },
  extension: [
    {
      url: "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg",
      valueCode: "oo",
    },
  ],
  url: "http://terminology.hl7.org/CodeSystem/v2-0286",
  identifier: [
    {
      system: "urn:ietf:rfc:3986",
      value: "urn:oid:2.16.840.1.113883.18.178",
    },
  ],
  version: "2.1.0",
  name: "ProviderRole",
  title: "providerRole",
  status: "active",
  experimental: false,
  date: "2019-12-01",
  publisher: "HL7, Inc",
  contact: [
    {
      telecom: [
        {
          system: "url",
          value: "http://www.hl7.org/",
        },
      ],
    },
  ],
  description:
    "Code system of concepts used to define the relationship between a referral recipient and a patient or between a referral initiator and a patient.  Used in HL7 Version 2.x messaging in the PRD segment.",
  purpose: "Underlying Master Code System for V2 table 0286 (Provider Role)",
  copyright: "Copyright HL7. Licensed under creative commons public domain",
  caseSensitive: true,
  valueSet: "http://terminology.hl7.org/ValueSet/v2-0286",
  hierarchyMeaning: "is-a",
  compositional: false,
  versionNeeded: false,
  content: "complete",
  property: [
    {
      code: "status",
      uri: "http://terminology.hl7.org/CodeSystem/utg-concept-properties#status",
      description: "Status of the concept",
      type: "code",
    },
    {
      code: "deprecated",
      uri: "http://terminology.hl7.org/CodeSystem/utg-concept-properties#v2-table-deprecated",
      description: "Version of HL7 in which the code was deprecated",
      type: "code",
    },
  ],
  concept: [
    {
      id: "2736",
      code: "RP",
      display: "Referring Provider",
      definition: "Referring Provider",
      property: [
        {
          code: "status",
          valueCode: "A",
        },
      ],
    },
    {
      id: "2737",
      code: "PP",
      display: "Primary Care Provider",
      definition: "Primary Care Provider",
      property: [
        {
          code: "status",
          valueCode: "A",
        },
      ],
    },
    {
      id: "2738",
      code: "CP",
      display: "Consulting Provider",
      definition: "Consulting Provider",
      property: [
        {
          code: "status",
          valueCode: "A",
        },
      ],
    },
    {
      id: "2739",
      code: "RT",
      display: "Referred to Provider",
      definition: "Referred to Provider",
      property: [
        {
          code: "status",
          valueCode: "A",
        },
      ],
    },
  ],
};
