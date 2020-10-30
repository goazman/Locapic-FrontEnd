export default function(pseudo = '', action) {
    if(action.type == 'savePseudo') {
        return action.pseudoData;
    } else {
        return pseudo;
    }
}