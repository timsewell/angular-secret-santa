export interface IElfObject {
    name: string;
    hash: string;
    buyingFor: string | boolean;
    beingBoughtFor: string | boolean;
    visited: number | boolean;
    email: string;
    sent: boolean;
    added: Date;
    showDelete?: boolean | string;
    docId?: string;
}
