const waySeparator = '/';

export function sumVotes(obj) {
    return Object.keys( obj )
        .reduce( function( sum, key ){
            return sum + parseFloat( obj[key] );
        }, 0 );
}

export function getParentByParentWay(parent, parentWay) {
    let way = parentWay.split(waySeparator);
    way.forEach(wayId => {
        parent = parent.comments.find((item) => item.id.toString() === wayId);
    });
    return parent;
}