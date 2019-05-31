import React from 'react';

const dict = {
    a:['à','á','â','ã','ă','ä','å','ӕ','ǽ'],
    b:[],
    c:['ç'],
    d:['ď'],
    e:['è','é','ê','ẽ','ē','ë','e̊'],
    f:[],
    g:[],
    h:[],
    i:['ì','í','î','ĩ','ī','ï','i̊'],
    j:['ĵ'],
    k:[],
    l:['ĺ','ľ'],
    m:[],
    n:['ń','ñ','ň'],
    o:['ò','ó','ô','õ','ō','ö','o̊','ø','ǿ'],
    p:[],
    qu:[],
    r:['ŕ','ř',],
    s:['ś','š','ß','ş'],
    t:['ť','ţ'],
    u:['ù','ú','û','ũ','ū','ü','ů'],
    v:[],
    w:[],
    x:[],
    y:['ỳ','ý','ỹ','ŷ','ÿ'],
    z:['ź','ż','ž','ƶ'],
}

const columnStyle = {
    display: 'flex',
    position: 'absolute',
    top: '-10px',
    flexWrap: 'wrap',
    height: '90px',
    width: '90px',
    margin: "9px",
    visibility: 'hidden',
    opacity: '0',
    transition: 'top .2s, opacity .2s',
    backgroundColor: 'lightblue',
}

const optionStyle = {
    width: '26px',
    height: '26px',
    lineHeight: '26px',
    textAlign: 'center',
    border: '1px solid darkslategrey',
    zIndex: '0',
    backgroundColor: "whitesmoke",
    cursor: "pointer",
    color: "darkslategrey",
    fontSize: '24px',
    transition: 'background-color .2s',
    margin: '1px',
    borderRadius: '5px'
}

const Diacritics = (props) => {
    let options = [];
    dict[props.symbol].forEach(option=>{
        options.push(<div className="option" style={optionStyle}>{option}</div>)
    })

    return(
        <div id={props.symbol} style={columnStyle}>
            {options}
        </div>
    )
}

export default Diacritics


//Target languages: English, Latin, Potuguese, Spanish, French, Italian, Romanian, German, Dutch, Danish, Icelandic, Norwegian, Swedish, Finnish, Polish, Czech, Slovak, 

//get: a breve, t cedille, s cedille,