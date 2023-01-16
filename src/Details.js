import React, { useState , useEffect , useRef} from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
    const params = useParams();
    const [artist,setArtist]=useState([])


    const audioElm=useRef(null);
    const [isPlay,setIsPlay]=useState(false)

    useEffect(()=>{


       const getArtist=async () =>{
        await fetch(`https://api-beta.melobit.com/v1/song/${params.id}`)
         .then(Response=>Response.json())
         .then(data=>{
             setArtist(data)
             console.log(data)
         })
     }

      getArtist()
      window.scrollTo(0,0);

   },[])

   useEffect(()=>{
    if( isPlay && audioElm.current){
        audioElm.current.play()
    }else if(audioElm.current )
    {
        audioElm.current.pause() ;
    }
   })




    return (
        <div>
           <div className="card m-5" >
  <div className="row g-0">
    <div className="col-md-4">
    {
        artist.image && <img className='img-fluid rounded-start' src={artist.album.image.cover.url}  alt='artist'/>

    }
    </div>
    <div className="col-md-8">
      <div className="card-body text-center">
        {artist.artists && <h5 className='card-title text-primary'>{artist.artists[0].fullName}</h5> }
        {<h5 className='card-title text-dark'>{artist.title}</h5> }
        <p className="card-text text-dark">

        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"  className="bi bi-skip-backward-fill" viewBox="0 0 16 16">
  <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"/>
</svg>
<span onClick={()=> setIsPlay(!isPlay)}>

{
    !isPlay?
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>  
:
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"  className="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg>
}
</span>


<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"  className="bi bi-skip-forward-fill" viewBox="0 0 16 16">
  <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z"/>
</svg>


{artist.audio &&
<audio co src={artist.audio.high.url} ref={audioElm}></audio>}

        </p>
        <p className='card-text text-dark'>
        download <br/><br/>

        <div className="btn-group align-items-center text-dark" role="group" aria-label="Basic outlined example">
            {artist.audio &&
            <> 
  <button type="button" className="btn btn-outline-primary">
  <a  className='text-decoration-none text-dark' href={artist.audio.medium.url} download> with 128 quality</a>
  </button>

  <button type="button" className="btn btn-outline-primary">
  <a className='text-decoration-none text-dark' href={artist.audio.high.url} download>with 320 quality</a>
  </button>
  </>
  }
</div>
             
        </p>
        {artist.lyrics && <p className='card-text text-dark' dir='rtl'>
        <small className="text-muted">{artist.lyrics}</small>
        </p>}

        
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Details;