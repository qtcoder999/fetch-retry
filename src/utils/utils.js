export function placeRequest(API, retry = 5, backoff = 0) {

    const retryCodes = [408, 500, 502, 503, 504, 522, 524]

    return new Promise((resolve, reject) => {

        fetch(API)
            .then(async (response) => {
                const { statusText } = response;

                if (!response.ok) {

                    if (retry > 0 && retryCodes.includes(response.status)) {

                        const mandatoryDelay = 100;
                        const delay = mandatoryDelay + (backoff)

                        setTimeout(() => {
                            resolve(placeRequest(API, retry - 1, backoff * 2))
                        }, delay)

                    }
                    if (retry <= 0) {
                        reject(statusText);
                    }

                } else {
                    return response.json()
                }

            })

    });


}

