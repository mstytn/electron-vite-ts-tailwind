import { protocol } from 'electron'
import path from 'node:path'
import * as fs from 'node:fs'

const addVidProtocol = () => {
  protocol.registerFileProtocol('vid', function (req, callback) {
    let requestedPath = req.url;
    const tempPath = requestedPath.substring('vid:///'.length);
    const tempPathArray = tempPath.split(':');
    const [diskName, folderName, baseName] = tempPathArray;
    const absPath = `${diskName}:${folderName}`;
    const pat = path.join(absPath, baseName);
    const check = fs.existsSync(pat);
  
    if (!check) {
      callback({
        // -6 is FILE_NOT_FOUND
        // https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
        error: -6
      });
      return;
    }
  
    callback({
      path: pat
    });
  })
}

const addPicProtocol = () => {
  protocol.registerFileProtocol('pic', function (req, callback) {
    let requestedPath = req.url
    const tempPath = requestedPath.substring('pic:///'.length)
    const tempPathArray = tempPath.split(':')
    const [diskName, folderName, baseName, screenshotSuffix] = tempPathArray
    const tempBaseName = baseName
      .split('.')
      .splice(0, baseName.split('.').length - 1)
      .join('.')
    const absPath = `${diskName}:${folderName}`
    const screenshotFileName = `${tempBaseName}-${screenshotSuffix}.jpg`
    const pat = path.join(absPath, screenshotFileName)
    let check = fs.existsSync(pat)
  
    if (!check) {
      callback({
        // -6 is FILE_NOT_FOUND
        // https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
        error: -6
      });
      return;
    }
  
    callback({
      path: pat
    });
  })
}

const protocols = [addVidProtocol, addPicProtocol]
const addProtocols = () => {
  protocols.forEach(p => p())
}
export { addProtocols }