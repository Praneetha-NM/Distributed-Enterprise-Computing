import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHeart, AiOutlinePlaySquare, AiOutlineArrowsAlt } from 'react-icons/ai'
import { CgScreen } from 'react-icons/cg'
import { BiShuffle, BiRepeat } from 'react-icons/bi'
import { IoMdSkipForward, IoMdSkipBackward } from 'react-icons/io'
import { PiMicrophoneStageDuotone } from 'react-icons/pi'
import { FaPause, FaPlay } from 'react-icons/fa'
import { HiMiniQueueList, HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { BsFillSpeakerFill } from 'react-icons/bs'
import { pauseMaster, playMaster, playSong } from '../../states/actors/songActor'
import { useGlobalContext } from '../../states/Context'
import "./SongBar.css"
import { songs } from '../Home/Home'


const SongBar = () => {
    const dispatch = useDispatch()
    const { progress, setProgress, resetEverything, currTime, setCurrTime, songIdx, setSongIdx, duration, setDuration } = useGlobalContext()

    const handleMaster = () => {
        if (isPlaying)
            dispatch(pauseMaster())
        else
            dispatch(playMaster())
    }

    const { masterSong, isPlaying } = useSelector(state => state.mainSong)
    useEffect(() => {
        if (masterSong.mp3) {
            setDuration(formatTime(masterSong?.mp3?.duration))
            // console.log(masterSong);
            if (isPlaying) {
                // console.log(masterSong.mp3);
                masterSong?.mp3?.play();
            } else {
                masterSong?.mp3?.pause();
            }
        }
        // if (isPlaying) {
        //     setInterval(() => {
        //         if (progress === 100) {
        //             dispatch(pauseMaster())
        //             resetEverything()
        //         }
        //         else {
        //             setProgress(Math.round((masterSong.mp3.currentTime / masterSong.mp3.duration) * 100))
        //         }
        //         setCurrTime(formatTime(masterSong.mp3.currentTime))
        //     }, 1000)
        // }

        // Code from Chat GPT 
        const interval = setInterval(() => {
            if (isPlaying && masterSong.mp3) {
                if (progress === 100) {
                    dispatch(pauseMaster());
                    resetEverything();
                } else {
                    setProgress(Math.round((masterSong.mp3.currentTime / masterSong.mp3.duration) * 100));
                }
                setCurrTime(formatTime(masterSong.mp3.currentTime));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [masterSong, isPlaying])


    const changeProgress = (e) => {
        setProgress(e.target.value)
        masterSong.mp3.currentTime = (e.target.value / 100) * masterSong.mp3.duration
    }

    const [volume, setVolume] = useState(50)
    const changeVolume = (e) => {
        setVolume(e.target.value)
        masterSong.mp3.volume = e.target.value / 100
    }

    const formatTime = (durationInseconds) => {
        let min = Math.floor(durationInseconds / 60)
        let sec = Math.round(durationInseconds % 60)

        let formattedDuration = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`

        return formattedDuration
    }

    const mouseEnter = () => {
        document.querySelector(".active_progress").style.background = "#0ecc00"
    }
    const mouseLeave = () => {
        document.querySelector(".active_progress").style.background = "#fff"
    }

    const enterVolume = () => {
        document.querySelector("#volume").style.background = "#0ecc00"
    }
    const leaveVolume = () => {
        document.querySelector("#volume").style.background = "#fff"
    }

    const forwardSong = () =>{
        if(masterSong.mp3){
            masterSong?.mp3?.pause()
            masterSong.mp3.currentTime = 0
        }
        resetEverything()
        // setSongIdx((prevstate) => prevstate===9 ? prevstate = 0 : prevstate+1)
        setSongIdx((prevstate) => prevstate+1)
        dispatch(playSong(songs[songIdx+1]))
    }

    const backwardSong = () =>{
        if(masterSong.mp3){
            masterSong?.mp3?.pause()
            masterSong.mp3.currentTime = 0
        }
        resetEverything()
        setSongIdx((prevstate) => prevstate-1)
        // setSongIdx((prevstate) => prevstate===0 ? prevstate = 9 : prevstate-1)
        dispatch(playSong(songs[songIdx-1]))
    }
    return (
        <div className='fixed px-2 bottom-0 flex items-center justify-between left-0 h-20 bg-[#242424] w-full'>
            <div className="w-2/12">
                <div className="flex gap-2 items-center">
                    <img src={masterSong.img} alt="" className='h-14' />
                    <div className="">
                        <h3 className='text-sm font-semibold mb-1'>{masterSong?.title || "My Life"}</h3>
                        <span className='text-xs'>{masterSong.artist || "Prathamesh Sirdesai"}</span>
                    </div>
                    <AiOutlineHeart className='ml-3 text-2xl' />
                    <CgScreen className='ml-3 text-2xl' />
                </div>
            </div>
            <div className="w-5/12">
                <div className="flex justify-center items-center gap-6 mb-2">
                    <BiShuffle />
                    <IoMdSkipBackward onClick={backwardSong}/>
                    {
                        isPlaying
                            ?
                            (<button onClick={handleMaster} className='flex justify-center rounded-full items-center bg-white p-2'>
                                <FaPause className='text-black text-lg' />
                            </button>)
                            :
                            (<button onClick={handleMaster} className='flex justify-center rounded-full items-center bg-white p-2'>
                                <FaPlay className='text-black text-lg' />
                            </button>)
                    }
                    <IoMdSkipForward onClick={forwardSong}/>
                    <BiRepeat />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm">{currTime}</span>
                    <div className="relative w-full flex item-center">
                        <input type="range" min={0} max={100} value={progress} disabled={!masterSong.mp3} onChange={changeProgress} onMouseLeave={mouseLeave} onMouseEnter={mouseEnter} className='w-full' name="" id="progress_bar" />
                        <div className={`active_progress w-[${progress}%]`}></div>
                    </div>
                    <span className="text-sm">{duration}</span>
                </div>
            </div>
            <div className="w-2/12 flex items-center gap-2 text-5xl">
                <AiOutlinePlaySquare />
                <PiMicrophoneStageDuotone />
                <HiMiniQueueList />
                <BsFillSpeakerFill />
                {volume <= 0 && <HiSpeakerXMark />}
                {volume > 0 && <HiSpeakerWave />}
                <div className="relative w-full flex items-center">
                    <input type="range" min={0} max={100} value={volume} disabled={!masterSong.mp3} onChange={changeVolume} className='w-full block' name="" id="" onMouseLeave={leaveVolume} onMouseEnter={enterVolume} />
                    {/* <input type="range" min={0} max={100} className='w-1/2' name="" id="" /> */}
                    <div className={`active_progress w-[${volume}%]`} id='volume'></div>
                </div>
                <AiOutlineArrowsAlt />
            </div>
            <div className="hidden">
                <div className="w-[0%]"></div>
                <div className="w-[1%]"></div>
                <div className="w-[2%]"></div>
                <div className="w-[3%]"></div>
                <div className="w-[4%]"></div>
                <div className="w-[5%]"></div>
                <div className="w-[6%]"></div>
                <div className="w-[7%]"></div>
                <div className="w-[8%]"></div>
                <div className="w-[9%]"></div>
                <div className="w-[10%]"></div>
                <div className="w-[11%]"></div>
                <div className="w-[12%]"></div>
                <div className="w-[13%]"></div>
                <div className="w-[14%]"></div>
                <div className="w-[15%]"></div>
                <div className="w-[16%]"></div>
                <div className="w-[17%]"></div>
                <div className="w-[18%]"></div>
                <div className="w-[19%]"></div>
                <div className="w-[20%]"></div>
                <div className="w-[21%]"></div>
                <div className="w-[22%]"></div>
                <div className="w-[23%]"></div>
                <div className="w-[24%]"></div>
                <div className="w-[25%]"></div>
                <div className="w-[26%]"></div>
                <div className="w-[27%]"></div>
                <div className="w-[28%]"></div>
                <div className="w-[29%]"></div>
                <div className="w-[30%]"></div>
                <div className="w-[31%]"></div>
                <div className="w-[32%]"></div>
                <div className="w-[33%]"></div>
                <div className="w-[34%]"></div>
                <div className="w-[35%]"></div>
                <div className="w-[36%]"></div>
                <div className="w-[37%]"></div>
                <div className="w-[38%]"></div>
                <div className="w-[39%]"></div>
                <div className="w-[40%]"></div>
                <div className="w-[41%]"></div>
                <div className="w-[42%]"></div>
                <div className="w-[43%]"></div>
                <div className="w-[44%]"></div>
                <div className="w-[45%]"></div>
                <div className="w-[46%]"></div>
                <div className="w-[47%]"></div>
                <div className="w-[48%]"></div>
                <div className="w-[49%]"></div>
                <div className="w-[50%]"></div>
                <div className="w-[51%]"></div>
                <div className="w-[52%]"></div>
                <div className="w-[53%]"></div>
                <div className="w-[54%]"></div>
                <div className="w-[55%]"></div>
                <div className="w-[56%]"></div>
                <div className="w-[57%]"></div>
                <div className="w-[58%]"></div>
                <div className="w-[59%]"></div>
                <div className="w-[60%]"></div>
                <div className="w-[61%]"></div>
                <div className="w-[62%]"></div>
                <div className="w-[63%]"></div>
                <div className="w-[64%]"></div>
                <div className="w-[65%]"></div>
                <div className="w-[66%]"></div>
                <div className="w-[67%]"></div>
                <div className="w-[68%]"></div>
                <div className="w-[69%]"></div>
                <div className="w-[70%]"></div>
                <div className="w-[71%]"></div>
                <div className="w-[72%]"></div>
                <div className="w-[73%]"></div>
                <div className="w-[74%]"></div>
                <div className="w-[75%]"></div>
                <div className="w-[76%]"></div>
                <div className="w-[77%]"></div>
                <div className="w-[78%]"></div>
                <div className="w-[79%]"></div>
                <div className="w-[80%]"></div>
                <div className="w-[81%]"></div>
                <div className="w-[82%]"></div>
                <div className="w-[83%]"></div>
                <div className="w-[84%]"></div>
                <div className="w-[85%]"></div>
                <div className="w-[86%]"></div>
                <div className="w-[87%]"></div>
                <div className="w-[88%]"></div>
                <div className="w-[89%]"></div>
                <div className="w-[90%]"></div>
                <div className="w-[91%]"></div>
                <div className="w-[92%]"></div>
                <div className="w-[93%]"></div>
                <div className="w-[94%]"></div>
                <div className="w-[95%]"></div>
                <div className="w-[96%]"></div>
                <div className="w-[97%]"></div>
                <div className="w-[98%]"></div>
                <div className="w-[99%]"></div>
                <div className="w-[100%]"></div>
            </div>
        </div>
    )
}

export default SongBar

// Tutoria; 8