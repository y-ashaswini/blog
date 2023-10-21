export default function Popup({ message }) {
    return message.length !== 0 && <div className='absolute z-50 top-0 right-16 bg-[#8E7D38] px-4 pt-16 pb-4 text-black1 rounded-b-lg flex flex-col items-center justify-between max-w-[150px]'><span className="bg-[#FAFAFA] bg-opacity-20 p-4 rounded-lg text-[#FAFAFA] font-bold overflow-hidden">{message.toUpperCase()}</span></div>
}