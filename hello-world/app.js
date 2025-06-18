// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWSXRay = require('aws-xray-sdk');
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    // Obtén el segmento principal de la traza
    const segment = AWSXRay.getSegment();
    const subsegment = segment.addNewSubsegment('MyBusinessLogic');

    // Agregar anotaciones (para búsqueda en la consola de X-Ray)
    subsegment.addAnnotation('userId', '1234');
    subsegment.addAnnotation('orderStatus', 'delivered');

    // Agregar metadatos (información adicional, pero no utilizable para búsquedas)
    subsegment.addMetadata('customData', { 'some key': 'some value' });

    subsegment.close();

    try {
        console.log("Hello Developers!!!")
        console.log("Ha ocurrido un ERROR IRRECUPERABLE en la aplicacion")
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Hello from Developing on AWS',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
