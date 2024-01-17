import { writable } from "svelte/store";

export class NavHelper {
    constructor() {
        this._prevNextLookup = {};
        this.Initialised = writable(false);
    }

    InitialiseFrom(navTreeData) {
        let _orderedPageList = [];
        appendPagesToList(navTreeData, _orderedPageList);

        let arrayLen = _orderedPageList.length;
        if (arrayLen > 1) {
            // handle the first page
            let prevPath = null;
            let curPath = _orderedPageList[0].path;
            let nextPath = _orderedPageList[1].path;
            this._prevNextLookup[curPath] = {'prev':prevPath, 'next':nextPath};
            prevPath = curPath;
            // handle the second to second-last pages
            for (let index = 1; index < arrayLen-1; index++) {
                const element = _orderedPageList[index];
                curPath = element.path;
                nextPath = _orderedPageList[index+1].path;
                this._prevNextLookup[curPath] = {'prev':prevPath, 'next':nextPath};
                prevPath = curPath;
              }
            // handle the last page
            curPath = _orderedPageList[arrayLen-1].path;
            nextPath = null;
            this._prevNextLookup[curPath] = {'prev':prevPath, 'next':nextPath};
      
        }
        this.Initialised.set(true);
    }

    _getPage(path, direction) {
        let p = this._prevNextLookup[path];
        if (p) {
            return p[direction]
        }
        return null;
    }

    GetPageBefore(path) {
        return this._getPage(path, 'prev')
    }

    GetPageAfter(path) {
        return this._getPage(path, 'next')
    }    
}

function appendPagesToList(pages, list) {
    pages.forEach((p) => {
        list.push(p);
        if (p['children']) {
            appendPagesToList(p['children'], list)
        }
    });
}

const _instance = new NavHelper();

export function NavHelperInstance() {
    return _instance;
}
