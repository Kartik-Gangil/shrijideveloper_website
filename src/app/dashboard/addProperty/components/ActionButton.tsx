interface Props {
    onSubmit: () => void;
}

const ActionButton = ({onSubmit}:Props) => {
    return (
        <>
            <button type="button" onClick={onSubmit} className="w-full bg-[#A86300]
text-white py-5 rounded-xl font-semibold hover:bg-[#8a4f00] hover:cursor-pointer" >

                Save Changes

            </button>

            <button type="button" className="w-full border border-[#D6B79A]
py-5 rounded-xl hover:cursor-pointer">

                Cancel

            </button>
        </>
    )
}

export default ActionButton
