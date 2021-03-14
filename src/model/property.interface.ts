export interface Property {
    totalAcres: string,
    legalDescription: string,
    soilProductivity: string,
    income: object,
}

export interface Sale extends Property {
    buyerName: string,
    sellerName: string,
    saleDate: string,
}

export interface Tract extends Property {
    tractInfo: object,
    sales: { [key: string]: Sale }
}
