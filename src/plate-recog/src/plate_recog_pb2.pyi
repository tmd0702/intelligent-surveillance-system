from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ClientInput(_message.Message):
    __slots__ = ("b64_data",)
    B64_DATA_FIELD_NUMBER: _ClassVar[int]
    b64_data: str
    def __init__(self, b64_data: _Optional[str] = ...) -> None: ...

class PlateData(_message.Message):
    __slots__ = ("plate_number", "confidence_score")
    PLATE_NUMBER_FIELD_NUMBER: _ClassVar[int]
    CONFIDENCE_SCORE_FIELD_NUMBER: _ClassVar[int]
    plate_number: str
    confidence_score: float
    def __init__(self, plate_number: _Optional[str] = ..., confidence_score: _Optional[float] = ...) -> None: ...

class ServerOutput(_message.Message):
    __slots__ = ("plate",)
    PLATE_FIELD_NUMBER: _ClassVar[int]
    plate: PlateData
    def __init__(self, plate: _Optional[_Union[PlateData, _Mapping]] = ...) -> None: ...
