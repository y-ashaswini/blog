export default function Popup({ message }) {
    return message.length !== 0 && <div className='absolute z-50 top-0 right-16 bg-[#FFBF00] px-4 pt-16 pb-4 text-black1 rounded-b-lg flex flex-col items-center justify-between'><span className="bg-white bg-opacity-30 p-4 rounded-lg text-white font-bold">{message.toUpperCase()}</span></div>
}