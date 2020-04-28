// Utilities
import pathOr from 'ramda/src/pathOr';

class Utils {
  constructor() {}

  formatBytes(a, b) {
    if (0 === a) return { value: 0, qualifier: 'Bytes' };
    let c = 1e3,
      d = b || 2,
      e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      f = Math.floor(Math.log(a) / Math.log(c));
    return { value: parseFloat((a / Math.pow(c, f)).toFixed(d)), qualifier: e[f] };
  }

  bucketsToLabels(buckets) {
    let labels = [];
    if (Array.isArray(buckets) && buckets.length > 0) {
      let prevBucket = 0;
      for (let bucket of buckets) {
        labels.push(`${prevBucket}-${bucket}`);
        prevBucket = bucket;
      }
      labels.push(`${prevBucket}-inf`);
    }
    return labels;
  }

  getKVObjSortedArray(obj, asc) {
    let keys = Object.keys(obj);
    let data = keys.map(x => {
      return { k: x, v: obj[x] };
    });
    data.sort(function(a, b) {
      return asc ? a.v - b.v : b.v - a.v;
    });
    return data;
  }

  getApiStatsArray(statsData) {
    let res = [];
    let apiStats = pathOr(null, ['apistats'], statsData);
    let apiDefs = pathOr(null, ['apidefs'], statsData);
    if (!apiStats) {
      return res;
    }
    for (let apiPath of Object.keys(apiStats)) {
      let apiMethods = apiStats[apiPath];
      for (let apiMethod of Object.keys(apiMethods)) {
        res.push(
          Object.assign(
            {
              path: apiPath,
              method: apiMethod
            },
            apiMethods[apiMethod],
            {
              tags: pathOr([], [apiPath, apiMethod, 'tags'], apiDefs).join(',')
            }
          )
        );
      }
    }
    return res;
  }

  getMethodStatsArray(statsData) {
    let res = [];
    let allMethodStats = pathOr(null, ['method'], statsData);
    if (!allMethodStats) {
      return res;
    }
    for (let methodName of Object.keys(allMethodStats)) {
      res.push(
        Object.assign(
          {
            method: methodName
          },
          allMethodStats[methodName]
        )
      );
    }
    return res;
  }

  getCurrentTimelineBucket(statsData) {
    let timelineSettings = pathOr(null, ['timeline', 'settings'], statsData);
    let timelineData = pathOr(null, ['timeline', 'data'], statsData);
    if (timelineData && timelineSettings) {
      return timelineData[timelineSettings.bucket_current];
    }
    return {};
  }

  // Returns timeline sorted by timestampts asc
  // TODO add API to return timeline in array already sorted
  getSortedTimeline(statsData) {
    let timelineSorted = [];
    let timelineSettings = pathOr(null, ['timeline', 'settings'], statsData);
    let timelineData = pathOr(null, ['timeline', 'data'], statsData);
    if (timelineData && timelineSettings) {
      for (let key of Object.keys(timelineData)) {
        let entry = timelineData[key];
        entry.tc = parseInt(key);
        entry.ts = entry.tc * (timelineSettings.bucket_duration || 60000);
        timelineSorted.push(entry);
      }
    }
    // Sort it by timecode ascending
    timelineSorted.sort(function(a, b) {
      return a.tc - b.tc;
    });
    return timelineSorted;
  }
}

const utils = new Utils();
export default utils;
