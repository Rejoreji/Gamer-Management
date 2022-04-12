class HttpException extends Error {
  statusCode;
  pageRender;
  rest;

  constructor({ message, statusCode, name, pageRender, ...rest }) {
    super(message);
    this.name = name || "Server_Error";
    this.statusCode = statusCode || 500;
    this.pageRender = pageRender || "/";

    this.rest = rest;
  }
}

class BadRequestException extends HttpException {
  statusCode = 400;
  name = "Bad_Request";
  rest;

  constructor({ message = "Bad Request", pageRender, ...fields }) {
    super({ message, pageRender });

    this.rest = fields;
  }
}

class UnauthorizedException extends HttpException {
  statusCode = 401;
  name = "Unauthorized";
  rest;

  constructor({ message = "Not Authorized", pageRender, ...fields }) {
    super({ message, pageRender });

    this.rest = fields;
  }
}

class ForbiddenException extends HttpException {
  statusCode = 403;
  name = "Forbidden";
  rest;

  constructor({ message = "Forbidden", pageRender, ...fields }) {
    super({ message, pageRender });

    this.rest = fields;
  }
}

class NotFoundException extends HttpException {
  statusCode = 404;
  name = "Not_FOUND";
  rest;

  constructor({ message = "Not Found", pageRender, ...fields }) {
    super({ message, pageRender });

    this.rest = fields;
  }
}

class ValidationException extends HttpException {
  statusCode = 422;
  name = "Validation";
  errors;
  rest;

  constructor({
    message = "Validation Failed",
    errors = [],
    pageRender,
    ...fields
  }) {
    super({ message, pageRender });

    this.errors = errors;
    this.rest = fields;
  }
}

module.exports = {
  HttpException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ValidationException,
};
