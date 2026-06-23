import Image from 'next/image';
import Marquee from 'react-fast-marquee';

interface Card {
    image: string;
    text: string
}

interface feature{
    feature:PerFeature[]
}
interface PerFeature{
    id: number;
    text: string;
    image:string
}

export const Card = ({ image, text }: Card) => {
    return (
        <div className='m-2 p-3 flex flex-col items-center justify-center text-center max-w-[140px] w-full'>
            {/* Container for the image to prevent it from warping */}
            <div className="flex-shrink-0 mb-2">
                <Image src={image} alt={text} width={50} height={50} />
            </div>

            {/* Heading wraps cleanly to the next line */}
            <h2 className="w-full break-words whitespace-normal text-sm font-semibold leading-tight">
                {text.toUpperCase()}
            </h2>
        </div>
    )
}


const Features = ({feature}:feature) => {

   

    return (
        <>
            <Marquee
                speed={50}
                gradient={true}
                gradientColor={'white'} // Optional: adds a nice fade on edges
                pauseOnHover={true}
                loop={0}
            >
                {
                    feature.map((data, i) => (
                        <Card key={i} text={data.text} image={data.image} />
                    )
                    )
                }
            </Marquee>
        </>
    )
}

export default Features
