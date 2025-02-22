const Error = ({title, message}) => {
    return (
        <div className={`error`}>
            <h2>{title}</h2>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Error;
