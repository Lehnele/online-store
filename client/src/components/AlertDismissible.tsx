import React, {FC} from 'react';
import {Alert, Nav} from 'react-bootstrap';

interface AlertDismissibleProps {
    closeAlert: () => void,
    variant: string,
    title: string,
    description: string
}

const AlertDismissible: FC<AlertDismissibleProps> = ({closeAlert, variant, title, description}) => {
    return (
        <div>
            <Alert className='m-3' style={{position: 'absolute', bottom: 0, left: 0}} variant={variant}
                   onClose={closeAlert} dismissible>
                <Alert.Heading>{title}</Alert.Heading>
                <p>
                    {description}
                </p>
            </Alert>
        </div>
    );

}


export default AlertDismissible;