// --- Dekaden ermitteln (tolerant bzgl. Namensschemata) ---
const decades = [];
if (typeof songs50s   !== 'undefined') decades.push({key:'50s', label:'1950er', list:songs50s});
if (typeof songs60s   !== 'undefined') decades.push({key:'60s', label:'1960er', list:songs60s});
if (typeof songs70s   !== 'undefined') decades.push({key:'70s', label:'1970er', list:songs70s});
if (typeof songs80s   !== 'undefined') decades.push({key:'80s', label:'1980er', list:songs80s});
if (typeof songs90s   !== 'undefined') decades.push({key:'90s', label:'1990er', list:songs90s});

// 2000er: akzeptiere songs2000s, songs00s, songs00
const D2000 = (typeof songs2000s !== 'undefined') ? songs2000s
            : (typeof songs00s   !== 'undefined') ? songs00s
            : (typeof songs00    !== 'undefined') ? songs00 : undefined;
if (D2000) decades.push({key:'00s', label:'2000er', list:D2000});

// 2010er: akzeptiere songs2010s, songs10s, songs10
const D2010 = (typeof songs2010s !== 'undefined') ? songs2010s
            : (typeof songs10s   !== 'undefined') ? songs10s
            : (typeof songs10    !== 'undefined') ? songs10 : undefined;
if (D2010) decades.push({key:'10s', label:'2010er', list:D2010});

// 2020er: akzeptiere songs2020s, songs20s, songs20
const D2020 = (typeof songs2020s !== 'undefined') ? songs2020s
            : (typeof songs20s   !== 'undefined') ? songs20s
            : (typeof songs20    !== 'undefined') ? songs20 : undefined;
if (D2020) decades.push({key:'20s', label:'2020er', list:D2020});

if (decades.length === 0) decades.push({key:'local', label:'Songs', list: []}); // Fallback
