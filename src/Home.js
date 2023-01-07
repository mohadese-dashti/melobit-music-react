import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [slide,setSlide]=useState([])
    const [newSongs,setNew]=useState([])
   
    useEffect(()=>{

        const getApiSlider=async () =>{
           await fetch('https://api-beta.melobit.com/v1/song/slider/latest')
            .then(Response=>Response.json())
            .then(data=>{
                setSlide(data.results)
                console.log(data.results)
            })
        }

        const getApiNewSongs=async () =>{
          await fetch('https://api-beta.melobit.com/v1/song/new/0/4')
           .then(Response=>Response.json())
           .then(data=>{
               setNew(data.results)
               console.log(data.results)
           })
       }
       getApiSlider()
       getApiNewSongs()

  },[])
    return (
        <div className='container-fluid mt-5'>
        <div className='row align-items-center justify-content-center'>
          <div className='col-md-8 col-sm-12 col-12 m-0 p-0'>
          <div id="carouselExampleControls" className="carousel slide mx-auto w-100" data-bs-ride="carousel">
<div className="carousel-inner ">
{
slide.map((s,i)=>(
      <div key={s.id} className={i===0?"carousel-item active":"carousel-item"}>
 <img src={s.image.slider.url} className="d-block w-100" alt="slide" />
      <div className="carousel-caption text-start">
        <h5>
           {/* <Link to={`details/${s.id}`} className='text-decoration-none'>
            
          </Link>  */}
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
</svg>
        </h5>
      </div>
      </div>

))
    }
  </div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>

          </div>
        </div>
        

        <div className='row mt-5 text-center'>
          <h2>
          WHAT'S YOUR MOOD?
          </h2>

        <div className='d-flex  align-items-center col-md col-sm-12 col-12 mt-3 romance'>
          <h2>ROMANCE</h2>
        </div>
        <div className='d-flex align-items-center col-md col-sm-12 col-12 mt-3 dance'>
          <h2>DANCE</h2>
        </div>
        <div className='d-flex align-items-center col-md col-sm-12 col-12 mt-3 happy'>
          <h2>HAPPY</h2>
        </div>
        <div className='d-flex align-items-center col-md col-sm-12 col-12 mt-3 sad'>
          <h2>SAD</h2>
        </div>
        </div>

        <div className='row mt-5 text-center '>
               <h2>NEW SONGS</h2>
            {
                newSongs.map((song)=>(
                    <div className='col-md col-sm-12 col-12 mt-3'key={song.id}>
                    <img src={song.album.image.cover.url} className='w-100' alt={song.album.name.replace('Single','')}/>
                    <h4 className='mt-2'>{song.album.name.replace('Single','')}</h4>
                    <h4 >{song.album.artists[0].fullName}</h4>
                    </div>
                ))
            }
        </div>
      </div>
    );
};

export default Home;