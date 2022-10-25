function Error({errors}) {
    
    if(typeof errors === 'string') {
        return (
            <div className="alert alert-danger" role="alert">
                <div>
                    {errors}
                </div>
            </div>
        )
    }else if(typeof errors === 'object' && errors.length > 0) {
        return (
            <div className="alert alert-danger" role="alert">
                {errors.map((err, index) => {
                    return (
                        <div key={index}>
                            <strong>{err.loc[1]}</strong> : {err.msg}
                        </div>
                    )
                })
            }
            </div>
        )
    }else {
        return ''
    }
}

export default Error
