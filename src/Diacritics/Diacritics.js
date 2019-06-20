import React from 'react';


const Diacritics = (props) => {

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
        q:[],
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
        alignContent: 'flex-start',
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
        transition: 'background-color .3s',
        margin: '1px',
        borderRadius: '5px'
    
    }


    const handleMouseUp = (event) => {
        let bigLetter = event.target.parentElement.parentElement.firstChild;
        let index = Array.from(document.getElementsByClassName("die")).indexOf(bigLetter)
        // if (props.clickIsAcceptable(index) && props.hasNotAlreadyBeenClicked(bigLetter)){
            props.colorClicks(bigLetter)
            props.getLetterFromClick(event.target.innerHTML)
            props.setLastClick(index)
        // }
    }

    let options = [];
    dict[props.symbol].forEach(option=>{
        options.push(<div onMouseUp={handleMouseUp} className="option" style={optionStyle}>{option}</div>)
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