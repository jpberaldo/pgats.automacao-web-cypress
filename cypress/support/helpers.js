export function getTimestamp() {

    return new Date().getTime();

};

export function getRandomEmail() {

    return `jp-test-qa-${getTimestamp()}@test.com`;
};