import React, { useEffect, useState } from "react";

export default function Main() {
    const [quantity, SetQuantity] = useState(50);
    const [words, SetWords] = useState([]);
    const [typed, SetTyped] = useState([]);
    const URL = "https://random-word-api.vercel.app/api";

    const GetList =() => {
        fetch(`${URL}?words=${quantity}`).then(res => res.json()).then(list => SetWords(list))
    };

    useEffect(()=> {

        GetList();
        document.addEventListener("keydown", (e) => {
            let dict = /^[a-zA-z0-9]{1}/
            if(dict.test(e.key)) SetTyped(typed.push(e.key));
        });

    }, []);

    return (
        <div>
            <input type="number" value={quantity} onChange={e => SetQuantity(e.target.value)}/>
            <div>
                {words.join(" ")}
            </div>
            <div>
                {typed}
            </div>
        </div>
    )
}