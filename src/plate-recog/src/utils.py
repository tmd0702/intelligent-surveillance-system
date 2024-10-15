import yaml
import numpy as np
import cv2

def read_config(path="config/config.yaml"):
    with open(path) as f:
        cfg = yaml.load(f, Loader=yaml.FullLoader)
        return cfg

def find_center_plate(license_plates, frame_center_x, frame_center_y):
    closest_plate = None
    closest_distance = float('inf')

    for license_plate in license_plates:
        for box in license_plate.boxes:
            x1, y1, x2, y2 = box.xyxy[0][0], box.xyxy[0][1], box.xyxy[0][2], box.xyxy[0][3]
            plate_center_x = ((x1 + x2) / 2).cpu()
            plate_center_y = ((y1 + y2) / 2).cpu()

            distance_to_center = np.sqrt((plate_center_x - frame_center_x) ** 2 + (plate_center_y - frame_center_y) ** 2)

            if distance_to_center < closest_distance:
                closest_distance = distance_to_center
                closest_plate = license_plate
    closest_plate

def read_config(path="config/config.yaml"):
    with open(path) as f:
        cfg = yaml.load(f, Loader=yaml.FullLoader)
        return cfg

def margin_pst(point):
    # top_left_x = int(min([point[0][0], point[1][0], point[2][0], point[3][0]]))
    top_left_y = int(min([point[0][1], point[1][1], point[2][1], point[3][1]]))
    # bot_right_x = int(max([point[0][0], point[1][0], point[2][0], point[3][0]]))
    bot_right_y = int(max([point[0][1], point[1][1], point[2][1], point[3][1]]))

    margin = int((bot_right_y - top_left_y) / 7)
    point[0][0] = point[0][0] - margin
    point[0][1] = point[0][1] - margin
    point[1][0] = point[1][0] + margin
    point[1][1] = point[1][1] - margin
    point[2][0] = point[2][0] + margin
    point[2][1] = point[2][1] + margin
    point[3][0] = point[3][0] - margin
    point[3][1] = point[3][1] + margin

    return point


def order_points(pts):
    # initialzie a list of coordinates that will be ordered
    # such that the first entry in the list is the top-left,
    # the second entry is the top-right, the third is the
    # bottom-right, and the fourth is the bottom-left
    rect = np.zeros((4, 2), dtype="float32")
    # the top-left point will have the smallest sum, whereas
    # the bottom-right point will have the largest sum
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    # now, compute the difference between the points, the
    # top-right point will have the smallest difference,
    # whereas the bottom-left will have the largest difference
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    # return the ordered coordinates
    return rect


def four_point_transform(image, pts):
    # obtain a consistent order of the points and unpack them
    # individually
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
    # compute the width of the new image, which will be the
    # maximum distance between bottom-right and bottom-left
    # x-coordiates or the top-right and top-left x-coordinates
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    # compute the height of the new image, which will be the
    # maximum distance between the top-right and bottom-right
    # y-coordinates or the top-left and bottom-left y-coordinates
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    # now that we have the dimensions of the new image, construct
    # the set of destination points to obtain a "birds eye view",
    # (i.e. top-down view) of the image, again specifying points
    # in the top-left, top-right, bottom-right, and bottom-left
    # order
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
    # compute the perspective transform matrix and then apply it
    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))
    # return the warped image
    return warped