from requests import Response
from starlette import status
from starlette.responses import JSONResponse

from src.util.config import *
from fastapi import Request,Response, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
import jwt
import os
import dotenv
import urllib3

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
        if refresh is None or access is None:
            return JSONResponse(
                status_code=status.HTTP_403_FORBIDDEN,
                content={"detail": str("Cookies"), "body": str("Missing cookies")}
            )
        try:
            printf(str(os.getenv("SECRET")))
            decode = jwt.decode(access, str(os.getenv("SECRET")), algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            try:
                http = urllib3.PoolManager()
                token = http.request("POST",
                                     configParser.get("jwt-secret", "MAIN_HUB_URL") + "/api/token", {"token": refresh})
                request.cookies.__setattr__("accessToken", token)
                refresh_decode = jwt.decode(token, str(os.getenv("SECRET")), algorithms=["HS256"])
                request.state.email = refresh_decode.get("email")
            except Exception as error:
                return JSONResponse(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"detail": str(error), "body": str(error)}
                )
        except(
                jwt.InvalidTokenError,
                jwt.InvalidKeyError,
                jwt.InvalidAlgorithmError,
                jwt.ImmatureSignatureError,
                jwt.MissingRequiredClaimError,
                jwt.InvalidAudienceError,
        ) as error:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": str(error), "body": str(error)}
            )
        else:
            request.state.email = decode.get("email")
        return await call_next(request)
