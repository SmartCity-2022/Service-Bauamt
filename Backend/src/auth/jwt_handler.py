from requests import Response
from starlette import status
from starlette.responses import JSONResponse

from src.util.config import *
from fastapi import Request,Response, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
import jwt
import os
import dotenv

dotenv.load_dotenv()
configParser = init_config()


class AuthorizeMiddleware(BaseHTTPMiddleware):
    async def dispatch(
            self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        if request.url.path in ["/docs", "/openapi.json"]:
            return await call_next(request)
        if request.method == "OPTIONS":
            return await call_next(request)

        access = request.cookies.get("accessToken")
        refresh = request.cookies.get("refreshToken")
        if not access or not refresh:
            raise HTTPException(status_code=403, detail="No cookies found!")
        if access and refresh:
            try:
                decode = jwt.decode(access, os.getenv("SECRET"), algorithms=["HS256"])
            except(
                    jwt.InvalidTokenError,
                    jwt.InvalidKeyError,
                    jwt.InvalidAlgorithmError,
                    jwt.ImmatureSignatureError,
                    jwt.MissingRequiredClaimError,
                    jwt.ExpiredSignatureError,
                    jwt.InvalidAudienceError
            ) as error:
                return JSONResponse(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"detail": str(error), "body": str(error)}
                )
            else:
                request.state.email = decode
            return await call_next(request)