import hashlib


def hash_workspace_key(
    workspace_key: str
) -> str:
    return hashlib.sha256(
        workspace_key.encode()
    ).hexdigest()