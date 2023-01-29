type Props = {
    cardTitle?: String
  };

const Card: React.FC<Props> = ({ cardTitle }) => {
    return (
        <section className="card">
            {cardTitle ?
                <h2 className='card-title'>{cardTitle}</h2>
                :
                ''
            }
        </section>
    )
}

export default Card