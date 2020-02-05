import React from 'react'
interface IProps {
    input: string,
    meta: any,
    props: any
}

class inputForm extends React.Component<IProps> {
    render() {
        const { input, meta, ...props } = this.props;
        const hasError = meta.error && meta.touched;
        return (
            <div>
                <div>
                    <input {...props}/>
                </div>
                {hasError && 
    <span>{meta.error}</span>
            }
            </div>
        )
    }
}

export default inputForm;