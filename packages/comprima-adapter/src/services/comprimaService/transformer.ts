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
  motivid: 'motiveId',
  filnamn: 'filename',
  'vidare-beskrivning': 'description',
  originaltext: 'originalText',
  kommentar: 'comment',
  tidpunkt: 'time',
  kreatörnamn: 'creatorName',
  kreatör: 'creator',
  yrke: 'occupation',
  'kreatör-adress': 'creatorAddress',
  'kreatör-ort': 'creatorCity',
  'kreatör-land': 'creatorCountry',
  firma: 'company',
  'geografisk-plats': 'location',
  gatunummer: 'streetNumber',
  fastighet: 'property',
  kvarter: 'block',
  församling: 'parish',
  'område-mindre': 'areaMinor',
  'område-större': 'areaMajor',
  ort: 'city',
  kommun: 'municipality',
  län: 'region',
  land: 'country',
  'gata-2': 'street2',
  'gatunummer-2': 'streetNumber2',
  'fastighet-2': 'property2',
  'kvarter-2': 'block2',
  deponent: 'depositor',
  arkivbildare: 'archiveInitiator',
  seriesignum: 'seriesSignature',
  serie: 'seriesName',
  volym: 'volume',
  taggar: 'tags',
  title: 'englishTitle',
  description: 'englishDescription',
  rättigheter: 'rights',
  album: 'album',
  'förvaring/ordning': 'storage',
  mediabärare: 'mediaCarrier',
  ursprungsid: 'originId',
  format: 'format',
  upplösning: 'resolution',
  språk: 'language',
  objektid: 'objectId',
  färgkodning: 'colorCode',
  negativ: 'negative',
  typ: 'type',
  mime: 'mimeType',
  längd: 'length',
  version: 'version',
  egenskaper: 'characteristics',
  verksamhet: 'business',
  år: 'year',
  'socken/församling': 'parish',
  gatunr: 'streetNumber',
  ägare: 'owner',
  beskrivning: 'description',
  nummer: 'number',
  försäkringsnummer: 'insuranceNumber',
  arkitekt: 'architect',
  utförande: 'make',
  skala: 'scale',
  '1': 'motiveId',
  '2': 'filename',
  '4': 'description',
  '5': 'originalText',
  '6': 'comment',
  '7': 'time',
  '8': 'creator',
  '9': 'creatorName',
  '10': 'creatorOccupation',
  '11': 'creatorAddress',
  '12': 'creatorCity',
  '13': 'creatorCountry',
  '14': 'company',
  '15': 'location',
  '16': 'street',
  '17': 'streetNumber',
  '18': 'property',
  '19': 'block',
  '20': 'parish',
  '21': 'areaMinor',
  '22': 'areaMajor',
  '23': 'city',
  '24': 'municipality',
  '25': 'region',
  '26': 'country',
  '27': 'street2',
  '28': 'streetNumber2',
  '29': 'property2',
  '30': 'block2',
  '31': 'depositor',
  '32': 'archiveInitiator',
  '33': 'seriesSignature',
  '34': 'seriesName',
  '35': 'volume',
  '36': 'tags',
  '37': 'englishTitle',
  '38': 'englishDescription',
  '39': 'properties',
  '41': 'rights',
  '42': 'album',
  '43': 'storage',
  '44': 'mediaCarrier',
  '45': 'originId',
  '46': 'format',
  '47': 'resolution',
  '48': 'language',
  '49': 'objectId',
  '50': 'unknown47',
  '51': 'unknown48',
  '52': 'type',
  '53': 'mimeType',
  '54': 'unknown54',
  '55': 'unknown55',
  "":"unknown_blank",
referens: "reference",
  "förvarande-institution": "archivingInstitution",
  referenskod: "referenceCode",
  arkiv: "archive",
  arkivnamn: "archiveName",
  auktoritetskod: "authorityCode",
  titel: "title",
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
  "upphovsrätt,-utgångsdatum":"copyrightExpirationDate",
  "anmärkning":"note",
  "topografi":"topography",
  "tätort":"urbanArea",
  stadsdel:"district",
  gatunamn:"street",
  "teknisk-information":"technicalInformation",
  originalformat:"originalFormat",
  filformat:"fileFormat",
  "systemtillhörighet":"systemAffiliaton",
  "digitiserat-datum":"digitisationDate",
  "teknisk-anmärkning":"technicalNote",
  kondition:"condition",
  speltid:"duration",
  ljud:"sound",
  filstorlek:"filesize",
  konkordans:"concordance",
  proveniens:"provenance",
  personer:"persons",
  "ämnesord,-bibliotek":"libraryIndexTerm",
  accessionskod:"accessionCode",
  "aat-kod":"aatCode",
  "handle-id":"handleId",
  pid: "pid",
}



/*
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
  '1': 'reference',
  '2': 'archivingInstitution',
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
*/

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

   if (!fields["depositor"]){
      fields["depositor"] = {
        id: 58,
        originalName: "depositor",
        value: "Arbetarrörelsens arkiv och bibliotek"
      }

    }

    if (!fields["seriesName"]){
      fields["seriesName"] = {
        id: 1001,
        originalName: "serie",
        value: "obekant serie"
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
