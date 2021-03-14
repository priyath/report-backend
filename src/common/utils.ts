import {Tract} from "../model/report.interface";

export const updateTracts = (currTracts: { [key: string]: Tract }, newTracts: { [key: string]: Tract }) => {

    // update currTracts content with newTracts content
    for (let tractId in newTracts) {
        if (newTracts.hasOwnProperty(tractId)) {
            const tract = newTracts[tractId];

            if (tractId in currTracts) {
                currTracts[tractId].pages = tract.pages;
            } else {
                currTracts[tractId] = {
                    id: tractId,
                    pages: tract.pages,
                }
            }
        }
    }
};
