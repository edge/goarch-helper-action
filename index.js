module.exports=(()=>{var e={432:(e,t,r)=>{const n=r(186);const s=e=>e.replace(/[^A-z\d]+/,"-");const o={arch:n.getInput("arch"),os:n.getInput("os")};const i={GOARCH:o.arch,GOARM:null,GOOS:o.os,alpine_platform:()=>{if(i.GOARCH==="arm"){if(i.GOARM==="6")return"arm32v6";if(i.GOARM==="7")return"arm32v7"}if(i.GOARCH==="arm64")return"arm64v8";return i.GOARCH},artifact_suffix:()=>`${o.os}-${s(o.arch)}`,docker_buildx_platform:()=>`${o.os}/${o.arch}`,docker_go_buildargs:()=>[`-e GOARCH=${i.GOARCH}`,i.GOARM&&`-e GOARM=${i.GOARM}`,`-e GOOS=${i.GOOS}`].filter(e=>e).join(" ")};if(/^arm\/v\d/.test(o.arch)){i.GOARCH="arm";i.GOARM=o.arch.match(/v(\d)/)[1]}Object.getOwnPropertyNames(i).map(e=>{let t=i[e];if(t instanceof Function)t=t();n.setOutput(e,t)})},351:function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)if(Object.hasOwnProperty.call(e,r))t[r]=e[r];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(r(87));const o=r(278);function issueCommand(e,t,r){const n=new Command(e,t,r);process.stdout.write(n.toString()+s.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const i="::";class Command{constructor(e,t,r){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=r}toString(){let e=i+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const r in this.properties){if(this.properties.hasOwnProperty(r)){const n=this.properties[r];if(n){if(t){t=false}else{e+=","}e+=`${r}=${escapeProperty(n)}`}}}}e+=`${i}${escapeData(this.message)}`;return e}}function escapeData(e){return o.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return o.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},186:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){function adopt(e){return e instanceof r?e:new r(function(t){t(e)})}return new(r||(r=Promise))(function(r,s){function fulfilled(e){try{step(n.next(e))}catch(e){s(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){s(e)}}function step(e){e.done?r(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})};var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)if(Object.hasOwnProperty.call(e,r))t[r]=e[r];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=r(351);const i=r(717);const u=r(278);const a=s(r(87));const c=s(r(622));var p;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(p=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const r=u.toCommandValue(t);process.env[e]=r;const n=process.env["GITHUB_ENV"]||"";if(n){const t="_GitHubActionsFileCommandDelimeter_";const n=`${e}<<${t}${a.EOL}${r}${a.EOL}${t}`;i.issueCommand("ENV",n)}else{o.issueCommand("set-env",{name:e},r)}}t.exportVariable=exportVariable;function setSecret(e){o.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){i.issueCommand("PATH",e)}else{o.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${c.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r){throw new Error(`Input required and not supplied: ${e}`)}return r.trim()}t.getInput=getInput;function setOutput(e,t){o.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){o.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=p.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){o.issueCommand("debug",{},e)}t.debug=debug;function error(e){o.issue("error",e instanceof Error?e.toString():e)}t.error=error;function warning(e){o.issue("warning",e instanceof Error?e.toString():e)}t.warning=warning;function info(e){process.stdout.write(e+a.EOL)}t.info=info;function startGroup(e){o.issue("group",e)}t.startGroup=startGroup;function endGroup(){o.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return n(this,void 0,void 0,function*(){startGroup(e);let r;try{r=yield t()}finally{endGroup()}return r})}t.group=group;function saveState(e,t){o.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},717:function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)if(Object.hasOwnProperty.call(e,r))t[r]=e[r];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(r(747));const o=n(r(87));const i=r(278);function issueCommand(e,t){const r=process.env[`GITHUB_${e}`];if(!r){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!s.existsSync(r)){throw new Error(`Missing file at path: ${r}`)}s.appendFileSync(r,`${i.toCommandValue(t)}${o.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},278:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:true});function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue},747:e=>{"use strict";e.exports=require("fs")},87:e=>{"use strict";e.exports=require("os")},622:e=>{"use strict";e.exports=require("path")}};var t={};function __webpack_require__(r){if(t[r]){return t[r].exports}var n=t[r]={exports:{}};var s=true;try{e[r].call(n.exports,n,n.exports,__webpack_require__);s=false}finally{if(s)delete t[r]}return n.exports}__webpack_require__.ab=__dirname+"/";return __webpack_require__(432)})();