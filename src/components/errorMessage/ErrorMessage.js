import errorMessage from './error.jpg'

const ErrorMessage = () => {
    return(

        <div>
            <img src={errorMessage} style={{ display: "block", width: 250, height: "auto", objectFit: "contain", margin: "0 auto" }} alt="Error" />
            
        </div>
       
    )
}

export default ErrorMessage;