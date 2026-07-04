export function success(res, data) {
  return res.json({
    success: true,
    data,
  });
}

export function error(res, message, code = 500) {
  return res.status(code).json({
    success: false,
    error: message,
  });
}
