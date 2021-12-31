export interface IPlayerInputMessage {
    x: number,
    y: number,
    a: number,
    b: number,
    select: number,
    start: number,
    xAxis: number,
    xDir: number,
    yAxis: number,
    yDir: number,
    msgType: string,
    clientId: string,
}