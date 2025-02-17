import { useEffect, useState } from "react";



 async function getReviews() {
    const res = await fetch('http://localhost:5000/api/review');
    if(!res.ok){
        const errorMessage = await res.text();
        throw new Error('Erreur API: ' + res.status + " - " + errorMessage);
    }
    const data = await res.json();
    console.log(data.reviews);
    return data.reviews;
}

export default function ReviewSection() {
    const [reviews, setReviews] = useState([]);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [note, setNote] = useState('');

    function handleEmail(e)
    {
        setEmail(e.target.value);
    }
    function handleMessage(e)
    {
        setMessage(e.target.value);
    }
    function handleNote(e)
    {
        setNote(e.target.value);
    }
    
    async function submit(){
        const resp = await fetch('http://localhost:5000/api/review', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email, message, note})
        });
        const data = await resp.json();
        setReviews([...reviews, data.review]);
    }
    useEffect(() => {
        (async () => {
            const reviewsFromDB = await getReviews();
            setReviews(reviewsFromDB);
        })();
    }, [])
    return (
        <div>
            <div>
                <input type="email" placeholder="jane.doe@gmail.com" onChange={handleEmail}></input>
                <input type="number" placeholder="Note*" onChange={handleNote}></input>
                <input type="text" placeholder="your message..." onChange={handleMessage}></input>
                <button onClick={submit}>Envoyer</button>
            </div>
            <div>{
            reviews.map((review)=> {
                return <div key={review._id}>
                <p>{review.email}</p>
                <p>{review.description}</p>
                <p>{review.note}</p>
                <p>{review.date}</p>
            </div>
            })
        }</div>
        </div>
    )
}