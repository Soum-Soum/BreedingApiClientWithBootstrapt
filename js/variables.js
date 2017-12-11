const URL_MAPS = "maps";
const URL_STUDIES = "studies-search";
const URL_MARKERS = "markers";
const URL_MARKER_PROFILES = "markerprofiles";
const URL_ALLELE_MATRIX = "allelematrix-search";
const URL_TOKEN="token";
const URL_CALLS = "calls";
const REQUIRED_CALLS = [URL_MAPS, URL_MARKERS, URL_STUDIES, URL_MARKER_PROFILES, URL_ALLELE_MATRIX];
const  ALL_CALLS = ['token', 'calls', 'markers', 'studies-search', 'maps', 'maps/{id}', 'maps/{id}/positions', 'markerprofiles', 'studies/{id}/germplasm', 'allelematrix-search', 'allelematrix-search/status', 'germplasm/{id}', 'germplasm-search'];
let urlEndPoint1 = "", urlEndPoint2="", tokenUrl2="" , tokenUrl1 = "", selectedMap = "", calls = "", mostPresentType = "";
let selectedMarkersProfils=[], selectedMarkers=[], hmapsType=undefined , hmapsLinkageGroup = [], response = [], cpyResp = [], Call2Url=[], url2Token = [], arrayOfMarkersType=[];
let clientPageSize=1000, startmentindex=0, sizeOfResquestedMatrix=0, totalPage =0;
let isEndPointInUrl=false, isMapIdInUrl=false, auth=true, exportIsAbort = false ,exportGermplasmsIsAbort = false ,is2EndPoint = false;