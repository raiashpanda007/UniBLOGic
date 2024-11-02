interface Sidebar_CardProps {
    title: string;
    description: string;
    img: string;
}
const Sidebar_Card = ({title = "Title", description = "descritption",img = "img"} : Sidebar_CardProps) => {
    return (
        <div>
            hi
        </div>
    )
}

export default Sidebar_Card;