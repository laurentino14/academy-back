export abstract class HttpResponse<type> {
  abstract statusCode: number;
  abstract data: type;
}
