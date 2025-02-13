import { Fields, Document } from '../../common/types'

interface ComprimaPage {
  Page: {
    PageType: string
    Data: string
    ThumbnailData: string
  }
}

interface ComprimaIndex {
  Value: string
  Number: number
  FieldType: string
  FieldName: string
}

interface ComprimaDocument {
  Id: number
  DocumentState: string
  IsDeleted: boolean
  Indices: {
    Index: ComprimaIndex[]
  }
  Pages: ComprimaPage
}

const transformDocuments = (xmlDocuments: ComprimaDocument[]): Document[] => {
  const documents = xmlDocuments.map(
    (xmlDocument: ComprimaDocument): Document => {
      const document = transformDocument(xmlDocument)
      return document
    }
  )

  return documents
}

interface IndexName {
  [key: string]: string
}

const indexTranslatedNames: IndexName = {
  referens: "reference",
  "förvarande-institution": "archivingInstitution",
  referenskod: "referenceCode",
  arkiv: "archive",
  arkivnamn: "archiveName",
  auktoritetskod: "authorityCode",
  titel: "title",
  beskrivning: 'description',
  "omfattar-tid": "timeCovered",
  "publicerat-datum": "published",
  materialtyp:"materialType",
  handlingstyp:"documentType",
  organisation: "organisation",
  "verksamhetsområde":"operationsArea",
  processgrupp:"processGroup",
  process:"process",
  diarienummer:"diaryNumber",
  identitfikationskod:"idCode",
  "tillstånd":"permission",
  "tillståndsbelagd":"hasLicense",
  "tillståndsvillkor":"licenseConditions",
  "innehåller-personuppgifter":"containsPersonalData",
  "upphovsrätt":"copyright",
  "upphovsrättsskyddat":"copyrightProtected",
  "upphovsrättsinnehavare":"copyrightHolder",
  "upphovsrätt,-utgångsdatum":"copyrightExporationDate",
  "anmärkning":"note",
  "topografi":"topography",
  land:"country",
  "län":"region",
  kommun:"municipality",
  "församling":"parish",
  "tätort":"urbanArea",
  stadsdel:"district",
  gatunamn:"street",
  "teknisk-information":"technicalInformation",
  originalformat:"originalFormat",
  filformat:"fileFormat",
  filnamn:"filename",
  "systemtillhörighet":"systemAffiliaton",
  "upplösning":"resolution",
  "digitiserat-datum":"digitisationDate",
  "teknisk-anmärkning":"technicalNote",
  kondition:"condition",
  speltid:"duration",
  ljud:"sound",
  filstorlek:"filesize",
  konkordans:"concordance",
  proveniens:"provenance",
  "språk":"language",
  personer:"persons",
  "ämnesord,-bibliotek":"libraryIndexTerm",
  accessionskod:"accessionCode",
  "aat-kod":"aatCode",
  "handle-id":"handleId",
  pid:"pid",
  "arkivbildare":"archiveInitiator",
  '1': 'archivingInstitution',
  '2': 'filename',
  '3': 'referenceCode',
  '4': 'archive',
  '5': 'archiveName',
  '6': 'authorityCode',
  '7': 'title',
  '8': 'description',
  '9': 'timeCovered',
  '10': 'published',
  '11': 'materialType',
  '12': 'documentType',
  '13': 'organisation',
  '14': 'operationsArea',
  '15': 'processGroup',
  '16': 'process',
  '17': 'diaryNumber',
  '18': 'idCode',
  '19': 'permission',
  '20': 'hasLicense',
  '21': 'licenseConditions',
  '22': 'containsPersonalData',
  '23': 'copyright',
  '24': 'copyrightProtected',
  '25': 'copyrightHolder',
  '26': 'copyrightExporationDate',
  '27': 'note',
  '28': 'topography',
  '29': 'country',
  '30': 'region',
  '31': 'municipality',
  '32': 'parish',
  '33': 'urbanArea',
  '34': 'district',
  '35': 'street',
  '36': 'technicalInformation',
  '37': 'originalFormat',
  '38': 'fileFormat',
  '39': 'filename',
  '40': 'systemAffiliaton',
  '41': 'resolution',
  '42': 'digitisationDate',
  '43': 'technicalNote',
  '44': 'condition',
  '45': 'duration',
  '46': 'sound',
  '47': 'filesize',
  '48': 'concordance',
  '49': 'provenance',
  '50': 'språk',
  '51': 'persons',
  '52': 'libraryIndexTerm',
  '53': 'accessionCode',
  '54': 'aatCode',
  '55': 'handleId',
  '56': 'pid',
  '57': 'archiveInitiator',
  '156':'unknownBlank',
  "":"unknownBlank"
}

const removedFields = ['comment', 'storage']

const getIndexName = (indexName: string): string => {
  let name = indexTranslatedNames[indexName]
  if (!name) {
    console.error('No translation for', indexName)
    name = indexName
  }

  return name
}

const transformDocument = (xmlDocument: ComprimaDocument): Document => {
  try {
    const fields: Fields = {}

    xmlDocument.Indices.Index.forEach((index: ComprimaIndex) => {
      const translationKey =
        index.FieldName?.toLowerCase().replace(' ', '-') ?? index.Number
      const indexName = getIndexName(translationKey)

      if (!removedFields.includes(indexName)) {
        fields[indexName] = {
          id: index.Number,
          originalName: index.FieldName,
          value: index.Value,
        }
      }
    })

    if (!fields["archiveInitiator"]){
      fields["archiveInitiator"] = {
        id: 57,
        originalName: "arkivbildare",
        value: "obekant arkivbildare"
      }
    }

    return {
      id: xmlDocument.Id,
      documentState: xmlDocument.DocumentState,
      fields,
      pages: [
        {
          pageType: xmlDocument.Pages.Page.PageType,
          url: xmlDocument.Pages.Page.Data,
          thumbnailUrl: xmlDocument.Pages.Page.ThumbnailData,
        },
      ],
    }
  } catch (error) {
    console.log(
      `Error transforming document`,
      JSON.stringify(xmlDocument, null, 2)
    )

    throw error
  }
}

export default {
  transformDocuments,
  transformDocument,
}
